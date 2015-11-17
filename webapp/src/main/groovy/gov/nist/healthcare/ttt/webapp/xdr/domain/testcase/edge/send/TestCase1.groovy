package gov.nist.healthcare.ttt.webapp.xdr.domain.testcase.edge.send

import gov.nist.healthcare.ttt.database.xdr.XDRRecordInterface
import gov.nist.healthcare.ttt.database.xdr.XDRTestStepInterface
import gov.nist.healthcare.ttt.webapp.xdr.core.TestCaseExecutor
import gov.nist.healthcare.ttt.webapp.xdr.domain.TestCaseBuilder
import gov.nist.healthcare.ttt.webapp.xdr.domain.TestCaseEvent
import gov.nist.healthcare.ttt.webapp.xdr.domain.testcase.StandardContent
import gov.nist.healthcare.ttt.webapp.xdr.domain.testcase.TestCaseSender
import gov.nist.healthcare.ttt.xdr.domain.TkValidationReport
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * Created by gerardin on 10/27/14.
 */

@Component
final class TestCase1 extends TestCaseSender {

    @Autowired
    public TestCase1(TestCaseExecutor ex) {
        super(ex)
    }

    @Override
    TestCaseEvent run(Map context, String username) {

        executor.createRecordForTestCase(context,username,id,sim)

        def content = new StandardContent()
        content.endpoint = endpoints[0]
        content.endpointTLS = endpoints[1]

        return new TestCaseEvent(XDRRecordInterface.CriteriaMet.PENDING, content)
    }

    @Override
    public void notifyXdrReceive(XDRRecordInterface record, TkValidationReport report) {

        XDRTestStepInterface step = executor.executeStoreXDRReport(report)
        XDRRecordInterface updatedRecord = new TestCaseBuilder(record).addStep(step).build()

        //TODO for now it is a manual check
        done(XDRRecordInterface.CriteriaMet.MANUAL, updatedRecord)

    }

    public TestCaseEvent getReport(XDRRecordInterface record) {
        executor.getSimpleSendReport(record)
    }
}
