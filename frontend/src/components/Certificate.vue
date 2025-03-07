<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-4 ">
    <div class="relative w-full max-w-4xl bg-white shadow-lg  overflow-hidden ctr">
      <!-- Colorful corners -->
      <div class="absolute top-0 left-0 w-155 h-310 z-50">
        <img src="../assets/Group 20378 (Copy).png" alt="">
      </div>
      <div class="absolute top-0 right-0 w-80 h-150 z-50">
        <img src="../assets/Group 20377 (Copy).png" alt="">
      </div>
      <div class="absolute bottom-0 left-0 w-28 h-28 z-50"></div>
      <div class="absolute top-[502px] left-0 w-80 h-80 z-50">
               <img src="../assets/Group 20379.png" alt="">
      </div>
      <div class="absolute top-[320px] right-0 w-155 h-310 z-50 ">
        <img src="../assets/Group 20380.png" alt="">
      </div>
      
      <!-- Certificate content -->
      <div class="relative border-4 border-gray-800 m-12 p-8 ">
       
        <div class="text-center">
          <div class="flex justify-center items-center">
           <img class="w-[354px] " src="../assets/mykartavya-logo (1).png" alt="">

          </div>
          <h1 class="text-[48px] md:text-5xl font-bold text-[#1D3644] mb-1">CERTIFICATE</h1>
          <h2 class="text-[26px] md:text-2xl text-gray-700 font-medium mb-8">OF ACHIEVEMENT</h2>
          
          <p class="text-[18px] font-semibold text-gray-800 mb-6">THIS CERTIFICATE IS PRESENTED TO</p>
          
        <h3 class="text-3xl md:text-4xl font-script text-secondary border-b-2 border-gray-300 pb-2 mb-6 mx-auto max-w-md" style="font-family: 'Dancing Script', cursive;">Aayush Kumar</h3>

          
          <p class="text-md md:text-lg text-gray-700 mb-12 mx-auto max-w-xl">
            In recognition of his/her efforts and achievement in completing the three months internship program.
          </p>
          
          <div class="flex justify-between items-center mt-10">
            <div class="text-center">
              <div class="border-b border-gray-400 pb-1 mb-1">
                <span class="text-xl font-signature">WM</span>
              </div>
              <p class="text-sm md:text-md text-gray-700">Head of Department</p>
            </div>
            
            <div class="flex flex-col items-center">
              <div class="flex space-x-1">
                <div class="text-yellow-500">
                  <img src="../assets/Group 20381.png" alt="">
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <div class="border-b border-gray-400 pb-1 mb-1">
                <span class="text-xl font-signature">JR</span>
              </div>
              <p class="text-sm md:text-md text-gray-700">Company CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificateOfAchievement',
}
</script>

<style>
.ctr{
  background-image: url(../assets/background.png);
}
/* Tailwind won't provide these specific font families, so we'd need to import them */
.font-script {
  font-family: 'Dancing Script', cursive; /* For the recipient name */
}

.font-signature {
  font-family: 'Pacifico', cursive; /* For signatures */
}

/* Add these imports in your main CSS file */
/* 
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
*/
</style>