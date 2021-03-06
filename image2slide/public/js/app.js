class RequestConst {
    static get SUCCESS_CODE() {
        return 0;
    }
    static get FAIL_CODE() {
        return 1;
    }
}

class App {
    constructor() {
        this.droppedFiles = false;
        this.uploadedFilesList = [];
    }

    run() {
        this.initFileDragDrop();
    }

    initFileDragDrop() {
        let _class = this;
        let isAdvancedUpload = function () {
            let div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
        }();
        let $form = $('#upload-form');
        if (isAdvancedUpload) {
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }).on('dragover dragenter', function () {
                $form.addClass('is-dragover');
            }).on('dragleave dragend drop', function () {
                $form.removeClass('is-dragover');
            }).on('drop', function (e) {
                _class.droppedFiles = e.originalEvent.dataTransfer.files;
                _class.displayOriginalImage()
            });
        }
        $form.on('submit', function (e) {
            if ($form.hasClass('is-uploading')) return false;
            $form.addClass('is-uploading').removeClass('is-error');
            if (isAdvancedUpload) {
                e.preventDefault();
                let ajaxData = new FormData($form.get(0));
                if (_class.droppedFiles) {
                    $.each(_class.droppedFiles, function (i, file) {
                        ajaxData.append($input.attr('name'), file);
                    });
                }
                ajaxData._token = $('meta[name="csrf-token"]').attr('content');
                $.ajax({
                    url: $form.attr('action'),
                    type: $form.attr('method'),
                    data: ajaxData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    complete: function () {
                        $form.removeClass('is-uploading');
                    },
                    success: function (data) {
                        $form.addClass(data.status == RequestConst.SUCCESS_CODE ? 'is-success' : 'is-error');
                        if (data.status != RequestConst.SUCCESS_CODE) $errorMsg.text(data.error);
                        _class.uploadedFilesList.push(data.fileName);
                    },
                    error: function () {
                        // Log the error, show an alert, whatever works for you
                    }
                });
            } else {
                // ajax for legacy browsers
            }
        });
    }

    displayOriginalImage() {
        //TODO display image after choose file
    }

    detectObjects() {
        //TODO send adjusted corners and get detection file + preprocessing image
    }

    downloadPPTX() {
        //TODO send updated detection objects and download PPTX file
    }

    displayConers() {
        //TODO display corners after receive from server
    }
}

class Detections {
    //TODO follow class at server size
}
class StepsNavigator {
    static TOTAL_STEPS = 4;
    static currentStep = 0;

    static nextStep() {
        //TODO process UI for next step
    }

    static previousStep() {
        //TODO prcess UI for previous step
    }
}
class Util {
    static lockScreen() {
        //TODO lockScreen and display loading
    }

    static releaseScreen() {
        //TODO release screen
    }

}
