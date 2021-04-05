<script>
  import Logo from "svg/Logo.svelte";
  import Nav from "./NavNew/index.svelte";
</script>

<div class="background">
  <div class="top">
    <div class="logo-container">
      <Logo />
    </div>
  </div>
  <div class="nav-content-wrap">
    <Nav />
    <div class="content px-6"><slot name="content" /></div>
  </div>
</div>

<style type="text/scss">
  .logo-container {
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top {
    background: white;
    height: 70px;
  }

  .nav-content-wrap {
    display: flex;
    height: calc(100vh - 75px);

    .content {
      background: #f7f7f7;
      flex: 1;
      border-radius: 35px 0px 0px 0px;
      overflow: auto;
    }
  }

  .background {
    background-color: white;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
</style>
