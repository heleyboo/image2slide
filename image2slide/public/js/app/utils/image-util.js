function ImageUtil() {

}

ImageUtil.readFromUrl = function(input, targetElement) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            targetElement.attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};
