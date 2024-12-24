<template>
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-center min-h-screen">
          <div class="auth_background hidden bg-cover lg:block lg:w-2/5" >
          </div>
          <router-view />
      </div>
  </section>
</template>
<script>
</script>
<style scope>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');
.raleway-medium {
  font-family: "Raleway", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.auth_background{
    background-image: url(../../assets/bot1.jpg);
}

</style>