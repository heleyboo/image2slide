<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Image2Slide</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{ asset('css/main.css') }}" rel="stylesheet">
        <script src="{{ asset('js/fabric.min.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script>
            var app = new App();
            $(function(){
                app.run();
            });
        </script>
    </head>
    <body>
            <div class="container" role="main">
                    <form method="post" action="upload" enctype="multipart/form-data" novalidate="" class="box has-advanced-upload" id="upload-form">
                        <div class="box__input">
                            <svg class="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
                            <input type="file" name="files[]" id="file" class="box__file" data-multiple-caption="{count} files selected">
                            <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
                            <button type="submit" class="box__button">Upload</button>
                        </div>
                        <div class="box__uploading">Uploading…</div>
                        <div class="box__success">Done! <a href="#" class="box__restart" role="button">Upload more?</a></div>
                        <div class="box__error">Error! <span></span>. <a href="#" class="box__restart" role="button">Try again!</a></div>
                    <input type="hidden" name="ajax" value="1"></form>
                </div>
        {{-- <canvas id="canvas" width="900" height="500"></canvas>
        <script>
            var canvas = new fabric.Canvas('canvas');
            var rect = new fabric.Rect({
                top : 100,
                left : 100,
                width : 60,
                height : 70,
                fill : 'transparent',
                stroke: 'red'
            });
            canvas.add(rect);
        </script>    --}}
    </body>
</html>
