<template>
    <div class="w-full flex bg-black light:text-black text-white dark:text-white bg-fixed">
        <div class="w-1/2 flex justify-center item-center">
        <div class="flex flex-col justify-center items-center">
        <img class="w-72" src="/src/assets/logo.png" alt="">
        <h1 class="text-center mt-5 text-5xl light:text-black dark:text-white raleway-medium font-bold">AI Powered Code Review System</h1>
        </div>
        </div>
        <div class="w-1/2 py-10">
            <router-view />
        </div>
    </div>
</template>
<style scope>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');
.raleway-medium {
  font-family: "Raleway", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

</style>