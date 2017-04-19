var ccdaValidator = angular.module('ttt.direct.ccdaValidator', []);

ccdaValidator.controller('CCDAValidatorCtrl', ['$scope', 'CCDAR2ValidatorFactory', '$state', 'ApiUrl',
	function($scope, CCDAR2ValidatorFactory, $state, ApiUrl) {

		$scope.fileInfo = {
			"flowChunkNumber": "",
			"flowChunkSize": "",
			"flowCurrentChunkSize": "",
			"flowTotalSize": "",
			"flowIdentifier": "",
			"flowFilename": "",
			"flowRelativePath": "",
			"flowTotalChunks": ""
		};

		$scope.selectedItem = [];

		$scope.ccdaTypes = [{
			"selected": false,
			"desc": "Clinical Office Visit Summary - ONC 2014 Edition 170.314(e)(2) - Clinical Summary",
			"code": "ClinicalOfficeVisitSummary"
		}, {
			"selected": false,
			"desc": "Transitions Of Care Ambulatory Summary - ONC 2014 Edition 170.314(b)(2) Transition of Care/Referral Summary - For Ambulatory Care",
			"code": "TransitionsOfCareAmbulatorySummary"
		}, {
			"selected": false,
			"desc": "Transitions Of Care Ambulatory Summary - ONC 2014 Edition 170.314(b)(7) Data Portability - For Ambulatory Care",
			"code": "TransitionsOfCareAmbulatorySummary"
		}, {
			"selected": false,
			"desc": "Transitions Of Care Ambulatory Summary - ONC 2014 Edition 170.314(b)(1) Transition of Care Receive - For Ambulatory Care",
			"code": "TransitionsOfCareAmbulatorySummary"
		}, {
			"selected": false,
			"desc": "Transitions Of Care Inpatient Summary - ONC 2014 Edition 170.314(b)(2) Transition of Care/Referral Summary - For Inpatient Care",
			"code": "TransitionsOfCareInpatientSummary"
		}, {
			"selected": false,
			"desc": "Transitions Of Care Inpatient Summary - ONC 2014 Edition 170.314(b)(7) Data Portability - For Inpatient Care",
			"code": "TransitionsOfCareInpatientSummary"
		}, {
			"selected": false,
			"desc": "Transitions Of Care Inpatient Summary - ONC 2014 Edition 170.314(b)(1) Transition of Care Receive - For Inpatient Care",
			"code": "TransitionsOfCareInpatientSummary"
		}, {
			"selected": false,
			"desc": "VDT Ambulatory Summary - ONC 2014 Edition 170.314 (e)(1) Ambulatory Summary",
			"code": "VDTAmbulatorySummary"
		}, {
			"selected": false,
			"desc": "VDT Inpatient Summary - ONC 2014 Edition 170.314 (e)(1) Inpatient Summary",
			"code": "DTInpatientSummary"
		}, {
			"selected": true,
			"desc": "Non-specific CCDA",
			"code": "NonSpecificCCDA"

		}];

		$scope.changed = function(item) {
			$scope.type = item;
		};

		$scope.apiUrl = ApiUrl.get();

		$scope.validator = {
			"messageFilePath": "",
			"ccdaType": "",
            "validationObjective": "",
            "referenceFileName": "noscenariofile"
		};

		$scope.successMessage = function(message) {
			$scope.fileInfo = angular.fromJson(message);
			$scope.validator.messageFilePath = $scope.fileInfo.flowRelativePath;
		};

		$scope.resetMessage = function() {
			$scope.fileInfo = {};
			$scope.validator.messageFilePath = "";
		};



		$scope.validate = function() {
			if ($scope.selectedItem.length > 0) {
				$scope.laddaLoading = true;
				$scope.validator.ccdaType = $scope.selectedItem[0].code;
                $scope.validator.validationObjective = $scope.selectedItem[0].code;
                $scope.validator.referenceFileName = $scope.fileInfo.flowFilename;
				CCDAR2ValidatorFactory.save($scope.validator, function(data) {
					$scope.laddaLoading = false;
                    $scope.ccdaappendfilename =    {ccdafilenaame : $scope.validator.referenceFileName};
					$scope.ccdaResult = angular.extend(data, $scope.ccdaappendfilename);
				}, function(data) {
					$scope.laddaLoading = false;
					throw {
						code: data.data.code,
						url: data.data.url,
						message: data.data.message
					};
				});
			} else {
				throw {
					code: "0x0045",
					url: "CCDA validator",
					message: "You have to select a CCDA type"
				};
			}
		};

	}
]);
