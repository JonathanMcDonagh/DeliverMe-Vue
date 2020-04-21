<template>
  <footer>
  <div class="container mt-5 mb-4 text-center text-md-left">
    <div class="row mt-3">

      <!--First column-->
      <div class="col-md-3 col-lg-4 col-xl-3 mb-4">
        <h6 class="text-uppercase font-weight-bold">
          <strong>DeliverMe</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>Offering fast and reliable delivery services and work to those who need some extra.</p>
      </div>
      <!-- END First column-->

      <!--Second column-->
      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold">
          <strong>Deliveries</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>
          <router-link to="/job" class="footerLink">Request Delivery</router-link>
        </p>
        <p>
          <router-link to="/myjobs" class="footerLink">My Deliveries</router-link>
        </p>
      </div>
      <!-- END Second column-->

      <!--Third column-->
      <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold">
          <strong>Registration</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>
          <router-link to="/login" class="footerLink">Login</router-link>
        </p>
        <p>
          <router-link to="/RegisterAsDriver" class="footerLink">Become A Driver</router-link>
        </p>
      </div>
      <!-- END Third column-->

      <!--Fourth column-->
      <div class="col-md-4 col-lg-3 col-xl-3">
        <h6 class="text-uppercase font-weight-bold">
          <strong id="contactUs">Contact Details</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>
          <i class="fa fa-home"></i> WIT, Waterford Ireland
        </p>
        <p>
          <i class="fa fa-envelope"></i> 20074520@mail.wit.ie
        </p>
      </div>
      <!-- END Fourth column-->

    </div>
  </div>

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https:/deliverme-wit.web.app" target="_blank" class="footerLink"> deliverme-wit.web.app</a>
  </div>
  <!-- END Copyright -->

  </footer>
</template>

<script>
export default {
  name: 'pagefooter'
}
</script>

<style scoped>
  a:hover{
    text-decoration:none;
  }

  .bottom .copyright {
    color: #17252a;
    font-weight: 600;
  }

  .copyright a {
    color: #2B7A78;
    margin-left: 3px;
    padding-right: 3px;
  }
  .bottom p {
    margin-bottom: 0;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
  }

  .copyright p span {
    color: #17252a;
  }

  .bottom .copyright p, .bottom .copyright a:hover{
    color: #17252a;
  }

  .footerLink {
    color: #3AAFA9;
    cursor: pointer;
  }

  .footerLink:hover {
    color: #17252A;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
