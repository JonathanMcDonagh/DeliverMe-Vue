<template>
    <!--Bottom Footer-->
    <div class="bottom section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="copyright">
              <p>© <span>2020</span> <a href="/" class="transition">DeliverMe</a> All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Bottom Footer-->
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
  .section-padding {
    padding: 20px 0;
  }
  .bottom {
    background-color: #fef2f1;
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

</style>
