<!DOCTYPE html>
<html lang="en">
 <head>
   @include('layout.partials.head')
 </head>
 <body>
  <div class="wrapper" style="overflow-x: hidden;">
    @include('layout.partials.nav')

    <div id="pricing" class="p-top-90 light-gray-bg div_bot3">
      <div class="main-container">
          @include('layout.partials.step') 

          <div class="row margin-bottom-20 margin-left-20">
            <div class="p-table">
              @include('layout.partials.left-sidebar')

              <div class="col-md-8">
                <div class="price-col title-col primary-section">
                 <h1 class="bold-font">UPLOAD IMAGE</h1>
              </div>
              </div>

              @include('layout.partials.right-sidebar')

            </div> {{-- @end p-table --}}
          </div> {{-- @end row --}}

        @include('layout.partials.footer')

        @include('layout.partials.footer-scripts')

      </div> {{-- @end main-container --}}
    </div> {{-- @end pricing --}}
  </div>  {{-- @end wrapper --}}
</body>
</html>