<template>
  <div class=" ">
 
<div>
    <Navbar/>
</div>
    
    <section class="flex flex-col lg:flex-row px-8">
      <aside class="lg:w-1/4 p-4 border-r border-gray-200">
             <div class="  bg-white">
    <h3 class="text-lg font-semibold mb-3">Filter by</h3>
    
    <!-- SDGs Section -->
    <div class="mb-4 border-b pb-2 border-t pt-2">
      <h4 class="text-sm font-medium mb-2">SDGs</h4>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="form-checkbox text-blue-600 rounded-none w-[16px] h-[16px]">
          <span class="flex items-center text-[12px] font-normal">
            <img src="https://s3-alpha-sig.figma.com/img/b5a4/c147/de603d02122da2ec416251eb5a233b3b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=io0Rs41TAHazIwR96pCa0tXjCmgozwhbjnK78OWgWheTyjA1Q3QLKtYEaHlJ9TzHcTBieo2nzCAnST8ktkJyn8yEBwbZXqDsKaz5534s5peFCDIU1JaxMA0yu2c~1xQ0NlJCBMCao8m3CAK2AI3YmEWBtfUo9iJ2NHhIXRzxZe7n5RwyT6vxUQtYxvDhkF-39c3IxMIKFRModJ88pYUxKq1tbFrp6pqyOeo1DhKKT-ctXG~zkFjDYYeHq-6b0B0jbtanomHyPM8KITXmOZ7NRzP4~ydafPOBazJ4C3P7Djtl5SI10o7E4kT-SThJjA6-mOkjEvQ~dk2mTav9Cv2UjQ__" class="w-5 h-5 mr-2 rounded-full"> All
          </span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="form-checkbox text-blue-600 rounded-none" style="width: 16px;">
          <span class="flex items-center text-[12px] font-normal">
            <img src="https://s3-alpha-sig.figma.com/img/688e/7a94/d05534c49dbbe9c0c94efb71c7fef84c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PKSCpduGi4nGd0xrbSSnUggnzY2ho41KjA25PdkPdBLjaMIvy2scTN9ABxLruAszf6SBEeHDp~Yp3FlNe-uhnA7i5HrtalOt4mT9dLsmyTVWMgeVM3g1eJKZEmwViHmomvQT8-E6~4lJaeP3vawIU6UCw52~j1S4jYJvEjU6PEzGxcW~blARM1xDKP5ZYXEJ7ahvkfX5LsZ~C1zm8eIorDgfYuXdavz8o2CmegIeSoi~4PihZQrrrgbVBzXMGcwkP~ASLpYwpbIF1LmsnL-SfCOJvuLU1Nileoxk8PgqRwq5BfRrnc4Oj20hV6TPRlpzS2hksr20NqyVsmDr~gFvAg__" class="w-5 h-5 mr-2 rounded-full"> SDG 2 : Zero Hunger
          </span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="form-checkbox text-blue-600 rounded-none">
          <span class="flex items-center text-[12px] font-normal">
            <img src="https://s3-alpha-sig.figma.com/img/d120/bed3/febd06259385c0ecc84a6409acf5219a?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sdKHWPai49TZS-fLOlE4HotvTA4RBW6TCAurXKGN92TqtPj43qSo~Uo2J~48HjjMy-E5pp3n2U4YRRbHQ7nU9-mMcZji16cWZRcn2qOdLkfZl~l1lLQEnpcJkFTnkeW37Fv-aAbCgHAKzKYHJbwMWd9RrFDqWkHX-sLEMMbiBeKr~yqt~9mY7OVyHy0ALenJxcjpn3go3ifAQ65nU6UfHaLugAHQq3F865WT8Rqz567XNG~53fPprksasn0GUcc-oOT-5DziWYLerrcV2C3PVGze79Gw975PQIIN4yWCoEgy6a3komk6E05L3uH5INkQhFAy4L-YCweNj5DUAp0mTw__" class="w-5 h-5 mr-2 rounded-full"> SDG 3 : Good Health and <br>Well-Being
          </span>
        </label>
      </div>
    </div>
    
    <!-- Volunteering Hours -->
    <div class="mb-4 border-b pb-2">
      <h4 class="text-sm font-medium mb-2">Volunteering Hours</h4>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input type="radio" name="volunteering" class="form-radio text-blue-600">
          <span class="text-[12px] font-normal">Low to High</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="radio" name="volunteering" class="form-radio text-blue-600">
          <span class="text-[12px] font-normal">High to Low</span>
        </label>
      </div>
    </div>
    
    <!-- Activity Type -->
    <div class="mb-4 border-b pb-2">
      <h4 class="text-sm font-medium mb-2">Activity Type</h4>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="form-checkbox text-blue-600 rounded-none">
          <span class="text-[12px] font-normal">Online</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="form-checkbox text-blue-600 rounded-none">
          <span class="text-[12px] font-normal">On Ground</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" class="form-checkbox text-blue-600 rounded-none">
          <span class="text-[12px] font-normal">Both</span>
        </label>
      </div>
    </div>
    
    <!-- Karma Points -->
    <div class="mb-4 border-b pb-2">
      <h4 class="text-sm font-medium mb-2">Karma Points</h4>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input type="radio" name="karma" class="form-radio text-blue-600">
          <span class="text-[12px] font-normal">Low to High</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="radio" name="karma" class="form-radio text-blue-600">
          <span class="text-[12px] font-normal">High to Low</span>
        </label>
      </div>
    </div>
    
    <!-- ARKs in my Region -->
    <div>
      <label class="flex items-center space-x-2">
        <input type="radio" name="arks" class="form-radio text-blue-600">
        <span class="text-[12px] font-normal">ARKs in my Region</span>
      </label>
    </div>
  </div>
      </aside>

      <main class="lg:w-3/4 p-4">
        <h2 class="text-lg font-semibold mb-4">Kindness & Volunteering</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="relative">
                                <img src="https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__"
                                    alt="Children" class="w-full h-40 object-cover" />
                                <div
                                    class="absolute top-0 left-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg">
                                    On-Ground
                                </div>
                                <div
                                    class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow">
                                    <span class="font-semibold">40 Points</span>
                                </div>
                                <div
                                    class="absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2">
                                    <span class="bg-white text-black px-2 py-1 rounded text-xs">SDG 10 : Reduced
                                        Inequalities</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900">Empower the needy</h3>
                                <p class="text-gray-600 text-sm mt-1">
                                    This Women’s Entrepreneurship Day, let’s empower underserved women running small
                                    business...
                                </p>
                                <div class="flex items-center text-sm text-gray-500 mt-3">
                                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> 01 Oct,
                                        2024 - 30 Nov, 2024</span>
                                    <span class="ml-auto flex items-center"><i class="far fa-clock mr-1"></i> 50
                                        hr</span>
                                </div>
                                 <div class="mt-3">
                              <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                              </div>
                              <p class="text-xs text-gray-600 mt-1">60% completed</p>
                            </div>
                            </div>
    </div>
     <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="relative">
                                <img src="https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__"
                                    alt="Children" class="w-full h-40 object-cover" />
                                <div
                                    class="absolute top-0 left-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg">
                                    On-Ground
                                </div>
                                <div
                                    class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow">
                                    <span class="font-semibold">40 Points</span>
                                </div>
                                <div
                                    class="absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2">
                                    <span class="bg-white text-black px-2 py-1 rounded text-xs">SDG 10 : Reduced
                                        Inequalities</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900">Empower the needy</h3>
                                <p class="text-gray-600 text-sm mt-1">
                                    This Women’s Entrepreneurship Day, let’s empower underserved women running small
                                    business...
                                </p>
                                <div class="flex items-center text-sm text-gray-500 mt-3">
                                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> 01 Oct,
                                        2024 - 30 Nov, 2024</span>
                                    <span class="ml-auto flex items-center"><i class="far fa-clock mr-1"></i> 50
                                        hr</span>
                                </div>
                                 <div class="mt-3">
                              <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                              </div>
                              <p class="text-xs text-gray-600 mt-1">60% completed</p>
                            </div>
                            </div>
    </div>
     <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="relative">
                                <img src="https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__"
                                    alt="Children" class="w-full h-40 object-cover" />
                                <div
                                    class="absolute top-0 left-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg">
                                    On-Ground
                                </div>
                                <div
                                    class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow">
                                    <span class="font-semibold">40 Points</span>
                                </div>
                                <div
                                    class="absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2">
                                    <span class="bg-white text-black px-2 py-1 rounded text-xs">SDG 10 : Reduced
                                        Inequalities</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900">Empower the needy</h3>
                                <p class="text-gray-600 text-sm mt-1">
                                    This Women’s Entrepreneurship Day, let’s empower underserved women running small
                                    business...
                                </p>
                                <div class="flex items-center text-sm text-gray-500 mt-3">
                                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> 01 Oct,
                                        2024 - 30 Nov, 2024</span>
                                    <span class="ml-auto flex items-center"><i class="far fa-clock mr-1"></i> 50
                                        hr</span>
                                </div>
                                 <div class="mt-3">
                              <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                              </div>
                              <p class="text-xs text-gray-600 mt-1">60% completed</p>
                            </div>
                            </div>
    </div>
     <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="relative">
                                <img src="https://s3-alpha-sig.figma.com/img/4eef/bb3e/cb7e638434524a3fd3e9120880f4b9fe?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HwfLpSHiSVsMn66x9wvOo7BzqaiJTMqiCXYE4iX6OZRxbGnsOOjDHT1xbXHQ8MGlWrapbOLLAJT4hPBAqtzqpmw~4pEA79VY1IRA4LBryMZuR~jzsZuF2gnKgKDZo06cKb14LKJ~YxaLbBbYME8qKc5AhBK8U6PceEklz7Flfgr2Q5ihmTKS5RFGImqVvd0O648b7Ajd5DaxAAmiZXKtlb8jFHRrpsyJ8~qyPLvnVqBh3OwySpBNL7WiRUtkaJIMNRGN6YCi~3QpupbFYfmiT6i8n4ME1gzkU3zSC9o3jjQzXVS-KuofZkXgG8UbRNzBzkR3Srz6AzFz1Fv4drkr~g__"
                                    alt="Children" class="w-full h-40 object-cover" />
                                <div
                                    class="absolute top-0 left-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg">
                                    On-Ground
                                </div>
                                <div
                                    class="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow">
                                    <span class="font-semibold">40 Points</span>
                                </div>
                                <div
                                    class="absolute left-2 bottom-2 flex items-center space-x-2 text-sm text-gray-700 font-medium mb-2">
                                    <span class="bg-white text-black px-2 py-1 rounded text-xs">SDG 10 : Reduced
                                        Inequalities</span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900">Empower the needy</h3>
                                <p class="text-gray-600 text-sm mt-1">
                                    This Women’s Entrepreneurship Day, let’s empower underserved women running small
                                    business...
                                </p>
                                <div class="flex items-center text-sm text-gray-500 mt-3">
                                    <span class="flex items-center"><i class="far fa-calendar-alt mr-1"></i> 01 Oct,
                                        2024 - 30 Nov, 2024</span>
                                    <span class="ml-auto flex items-center"><i class="far fa-clock mr-1"></i> 50
                                        hr</span>
                                </div>
                                 <div class="mt-3">
                              <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                              </div>
                              <p class="text-xs text-gray-600 mt-1">60% completed</p>
                            </div>
                            </div>
    </div>
          
          <!-- Repeat similar blocks for other opportunities -->
          
        </div>
      </main>
    </section>
    <!-- <footer class="bg-black text-white py-10 px-5">
    <div class=" flex flex-col md:flex-row justify-between">
      <div class="mb-8">
        <h2 class="font-bold mb-2">Explore</h2>
        <ul>
          <li>About MyKartavya</li>
          <li>MyKartavya Features</li>
          <li>Acts of Random Kindness</li>
          <li>Volunteering Opportunities</li>
          <li>MyKartavya for Companies</li>
          <li>MyKartavya for NGOs</li>
        </ul>
      </div>

      <div class="mb-8">
        <h2 class="font-bold mb-2">Resources</h2>
        <ul>
          <li>Testimonials</li>
          <li>MyKartavya FAQs</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
          <li>Disclaimer</li>
        </ul>
      </div>

      <div class="mb-8">
        <h2 class="font-bold mb-2">Contact Us</h2>
        <p>📍 NASSCOM Plot 7 to 10, Sector 126, Noida – 201303</p>
        <p>📞 +91-120-4990111</p>
        <p>✉️ mykartavya@nasscomfoundation.org</p>
      </div>

      <div class="mb-8">
        <h2 class="font-bold mb-2">Subscribe</h2>
        <input type="email" placeholder="Email address" class="p-2 text-black mr-2 rounded-md" />
        <button class="bg-orange-500 text-white p-2 rounded-md">➞</button>
        <p class="mt-2">NASSCOM Foundation is the social arm of the IT-BPM industry body, NASSCOM.</p>
      </div>
    </div>

    <div class="flex justify-between items-center mt-10 border-t border-gray-700 pt-4">
      <div class="flex items-center">
        <span class="font-bold">MyKartavya</span>
        <span class="mx-2">|</span>
        <span>NASSCOM Foundation</span>
      </div>
      <div class="flex">
        <a href="#" class="mx-2 text-gray-400 hover:text-white">Terms</a>
        <a href="#" class="mx-2 text-gray-400 hover:text-white">Privacy</a>
        <a href="#" class="mx-2 text-gray-400 hover:text-white">Cookies</a>
      </div>
    </div>
  </footer> -->
  </div>
</template>

<script setup>

import Navbar from '../components/Navbar.vue';

</script>

<style scoped>
/* Any additional styling can be placed here */
</style>