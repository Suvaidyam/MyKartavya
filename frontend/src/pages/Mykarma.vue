<template>
  <div>
    <div class="sticky top-0 z-40">
      <Navbar/>
    </div>
  <div class="  flex flex-col lg:flex-row p-5">
  <aside class="lg:w-1/4 p-4 border-r border-gray-200">
        <h2 class="text-lg font-medium mb-4">Filter by</h2>
        <div class="mb-2">
          <h3 class="font-medium text-[14px]">SDGs</h3>
          <label class="block text-[12px] font-normal"><input type="checkbox" /> All</label>
          <label class="block text-[12px] font-normal"><input type="checkbox" /> SDG 2 - Zero Hunger</label>
          <label class="block text-[12px] font-normal"><input type="checkbox" /> SDG 3 - Good Health and Well-Being</label>
        </div>
        <div class="mb-2">
          <h3 class="font-medium text-[14px]">Volunteering Hours</h3>
          <label class="block text-[12px] font-normal"><input type="radio" name="hours" /> Low to High</label>
          <label class="block text-[12px] font-normal"><input type="radio" name="hours" /> High to Low</label>
        </div>
        <div class="mb-2">
          <h3 class="font-medium text-[14px]">Activity Type</h3>
          <label class="block text-[12px] font-normal"><input type="radio" name="activity" /> Online</label>
          <label class="block text-[12px] font-normal"><input type="radio" name="activity" /> On Ground</label>
          <label class="block text-[12px] font-normal"><input type="radio" name="activity" /> Both</label>
        </div>
        <div class="mb-2">
          <h3 class="font-medium text-[14px]">Karma Points</h3>
          <label class="block text-[12px] font-normal"><input type="radio" name="karma" /> Low to High</label>
          <label class="block text-[12px] font-normal"><input type="radio" name="karma" /> High to Low</label>
        </div>
        <div>
          <h3 class="font-medium text-[14px]">ARKs in my Region</h3>
          <label class="block"><input type="checkbox" /> Enable</label>
        </div>
      </aside>

    <main class="w-full lg:w-3/4 p-4">
     <div class="flex justify-between">
       <h1 class="text-2xl font-semibold mb-4">My Karma</h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h12M3 18h6"/></svg>

     </div>
      <section>
        <h2 class="text-[16px] font-medium mb-2">Current Commitments</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="card bg-white">
          <router-link to="/empower">  <img src="https://s3-alpha-sig.figma.com/img/2878/a4c5/9c959de9c3b9d28a480e8fc8a4b1bd81?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=deepSM9~pkpevq~2swFyA4g0zXUcOIZPg5bJaXVkcmNHwIVlwtQXJawLkEvr0pX3TeNueL4NtGlBtDG~zjxi8~C3mdRVPemZZudl8iw762tyT0kEi9Bk~9VwXQL299RLLLCnWeZYJo2pjXO-LuRi5aIUSu6rLnhmt3tjg7~pk5d8ICtHc2dOAKj~y80StIzWEII1KaRnoaoIQ8tDNap8Irp-3yBAItf~HCCc16FR8mdsShP0NlfshhwZxB6tEXVhfTPVj5bqC358wSr1CXqzQjbEfFqOTyETJm9zxc7OV6si2QRhJgtEzlXmgjtRGYUUy4~tv4w7SiEbkpBKNyQ0Wg__" alt="Empower the needy" class="rounded-md" /></router-link>
            <h3 class="font-bold">Empower the Needy</h3>
            <p class="text-sm">01 Oct, 2024 - 30 Nov, 2024</p>
            <p class="text-sm">50 hr</p>
                 <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">60% completed</p>
                  </div>
          </div>
          <div class="card bg-white  ">
            <img src="https://s3-alpha-sig.figma.com/img/cf5a/e80b/5af50b803bdf150f87177ec61c0cb866?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MPpLXDxR-7Mz0MQFkWnhmSyObJfI4z4VDZvVlueNBg~iGyZFVOD41q4Obqn7xoJuNxtdnzdLoQHn-qaElsaJFs9z-X2lGggHiaMCvvlfwSFQfr4jp4jPMxMMiERwFoWsqkayneYb5Gf2nc~A3tnVdm~dAgpfaTz~~be6qrDjoPDGsbdLlL1rxX6Baf55bS7rqJ~TKLD9~ami6kHY0Mf0hvePEZg7AQkUQGUvomCWkbEpcRQgpFg1-LKxxFXeIm~5Fk-epyZpdcG8L5IpcwSpaEFA~sC6HiOHhY51niQwbTdFZpSSLuRGHlnRg4LOwc0BsQK2v0aaGJD7R5oocLJaZw__" alt="Empower the needy" class="rounded-md" />
            <h3 class="font-bold">Circle of Care</h3>
            <p class="text-sm">01 Oct, 2024 - 30 Nov, 2024</p>
               <p class="text-sm">50 hr</p>
            <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">60% completed</p>
                  </div>
          </div>
          <div class="card bg-white  ">
            <img src="https://s3-alpha-sig.figma.com/img/840e/b3d9/2603778c83ebba0e8b1228b22d0dd7c9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bAt2RfM575loI0HINy4bP87zAgzxw5TYGm0ie4-zNgTk3NuinlA6jCy0~cFhpFRwCLFCdUyxX66c~R1-YP1gYHeE1wWCB5q0-3WXqeAIKuvPuHSqLCbndOH9FYaRIYkAcbOwn6yO~dKGHj3cfsjl3yJokZWxe288flUZlFLzvlrNfDG5AlcZDAyrImMDHvc00Z1BUKUwNF077DEUjqP3TGrhsecQAiSfMdSFNo7pgmdHy5xaxxk32aiGuX8AQL2vKj4ZEf5afaYHZ0pFo2D7DmyNU4eiuQcZGToi1TNIIqIMIRKweKg5TKv8AMlCV60rSj0RgD6ziU1b2lrLFJXUIw__" alt="Empower the needy" class="rounded-md" />
            <h3 class="font-bold">Beat the Sugar</h3>
            <p class="text-sm">01 Oct, 2024 - 30 Nov, 2024</p>
            <p class="text-sm">50 hr</p>
            <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 60%;"></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-1">60% completed</p>
                  </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold my-4">Available Commitments</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                <div class="flex items-center mt-3">
                                    <div class="flex -space-x-2">
                                        <img src="..//assets/download (3).jpeg" alt="User 1"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <div
                                            class="w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white">
                                            +5
                                        </div>
                                    </div>
                                    <button class="ml-auto text-orange-600 font-semibold text-sm">ACT NOW →</button>
                                </div>
                            </div>
                        </div>
                        <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="relative">
                                <img src="https://s3-alpha-sig.figma.com/img/4925/6686/2536992c32f72f58b66a7769a6226fd1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a67iRkNKrfuO9FTJtxqySKsKg5XqiMxUz1NxW8eM5WfcZVDQT8QkUooHVg1CSh78LVVcG10OAmc-t2OIopz4itRPsaOYaYfvfebE0Ry30XoFWYamZZvFhpaeEW5vNaaf63K1bWbYtve9-3TOHs~5sl8vbA0ZEQxUn0sLDpGWgHkVloOodLSsRoMYFWdiq83kUNufCZeuByWzxJwewyIbkG~N~B5Z844DNOvbTdlZau~nJOb3qlqbRGYMvE~o0-FZfbLnvJ4w6npXKXS7I--Wd-~d4S7c1yAs73wi2UnUX4UjkBTsSyyNE-zj20h~vk9AvWr~sO61Ulh57uWYG~RmFQ__"
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
                                <div class="flex items-center mt-3">
                                    <div class="flex -space-x-2">
                                        <img src="..//assets/download (3).jpeg" alt="User 1"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <div
                                            class="w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white">
                                            +5
                                        </div>
                                    </div>
                                    <button class="ml-auto text-orange-600 font-semibold text-sm">ACT NOW →</button>
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
                                <div class="flex items-center mt-3">
                                    <div class="flex -space-x-2">
                                        <img src="..//assets/download (3).jpeg" alt="User 1"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <div
                                            class="w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white">
                                            +5
                                        </div>
                                    </div>
                                    <button class="ml-auto text-orange-600 font-semibold text-sm">ACT NOW →</button>
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
                                <div class="flex items-center mt-3">
                                    <div class="flex -space-x-2">
                                        <img src="..//assets/download (3).jpeg" alt="User 1"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <img src="..//assets/download (2).jpeg" alt="User 2"
                                            class="w-8 h-8 rounded-full border-2 border-white" />
                                        <div
                                            class="w-8 h-8 bg-gray-200 text-gray-600 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white">
                                            +5
                                        </div>
                                    </div>
                                    <button class="ml-auto text-orange-600 font-semibold text-sm">ACT NOW →</button>
                                </div>
                            </div>
                        </div>
        </div>
      </section>
    </main>

    <aside class=" w-full lg:w-1/4 bg-white border border-gray-100 p-4 rounded-md  lg:mt-0">
         <div class="flex items-center mb-4">
      <img
        src="..//assets/download (2).jpeg"
        alt="Profile Picture"
        class="rounded-full w-[60px] h-[60px] object-cover mr-4"
      />
      <div>
        <h2 class="text-[14px] font-medium">Aayush Kumar</h2>
        <p class="text-gray-600 text-[12px]">aayush.kumar@mail.com</p>
        <button class="text-[10px] font-semibold mt-2" style="color: #FF5722;">Edit Profile</button>
      </div>
    </div>

    <h3 class="text-[19px] font-medium  mb-4">Total Karma Points</h3>
    <p class="text-[47px] font-bold mb-4 text-red-500">1,823</p>

    <div class="grid grid-cols-2 gap-4">
      <div class="border border-gray-300 rounded-lg p-4 text-center">
        <span class="block text-green-500 text-xl">🫶</span>
        <h4 class="font-medium text-[10px]" style="color: #666666;">Act of Random Kindness</h4>
        <p class="text-lg">98</p>
      </div>
      
      <div class="border border-gray-300 rounded-lg p-4 text-center">
        <span class="block text-yellow-500 text-xl">✅</span>
        <h4 class="font-medium text-[10px]" style="color: #666666;">Completed Opportunities</h4>
        <p class="text-lg">12</p>
      </div>
      
      <div class="border border-gray-300 rounded-lg p-4 text-center">
        <span class="block text-blue-500 text-xl">⏳</span>
        <h4 class="font-medium text-[10px]" style="color: #666666;">Time Donated</h4>
        <p class="text-lg">76 hrs</p>
      </div>

      <div class="border border-gray-300 rounded-lg p-4 text-center">
        <span class="block text-purple-500 text-xl">💰</span>
        <h4 class="font-medium text-[10px]" style="color: #666666;">Money Saved</h4>
        <p class="text-lg">₹ 1,765</p>
      </div>
    </div>
      <!-- <h2 class="text-lg font-semibold mb-4">User Info</h2>
      <div class="bg-white p-4 rounded-lg shadow-md">
        <p class="font-bold">Aayush Kumar</p>
        <p class="text-sm">aayush.kumar@mail.com</p>
        <div class="mt-2">
          <p>Total Karma Points: 1,823</p>
          <p>Act of Random Kindness: 98</p>
          <p>Completed Opportunities: 12</p>
          <p>Time Donated: 76 hrs</p>
          <p>Money Saved: ₹1,765</p>
        </div>
      </div>
      <h2 class="text-lg font-semibold mt-4">Top Performers</h2>
      <ul>
        <li>Anaya Singh - 189 Points</li>
        <li>Jayant Bhandari - 182 Points</li>
        <li>Swati Mathwal - 176 Points</li>
      </ul> -->
      <div class="bg-white rounded-lg shadow-md p-6 w-full mt-4">
    <h2 class="text-2xl font-bold text-center mb-4">Top Performers</h2>
    <div class="flex justify-center mb-6">
      <div class="relative">
        <img src="..//assets/download (1).jpeg" alt="Trophy" class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />
        <div class="bg-yellow-300 rounded-full w-32 h-32 flex items-center justify-center">
          <img src="..//assets/download (2).jpeg" alt="Anaya Singh" class="rounded-full w-24 h-24" />
        </div>
      </div>
    </div>
    
    <div class="flex justify-around mb-6">
      <div class="flex flex-col items-center">
        <img src="..//assets/download (2).jpeg" alt="Jayant Bhandari" class="rounded-full w-16 h-16" />
        <p>Jayant Bhandari<br><span class="text-sm">90 Points<br>60 hr</span></p>
      </div>
      <div class="flex flex-col items-center">
        <img src="..//assets/download (3).jpeg" alt="Swati Mathwal" class="rounded-full w-16 h-16" />
        <p>Swati Mathwal<br><span class="text-sm">60 Points<br>30 hr</span></p>
      </div>
    </div>
    
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="text-[10px]">Name</th>
          <th class="text-[10px]">Time</th>
          <th class="text-[10px]">Karma Points</th>
          <th class="text-[10px]">Rank</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index" class="border-t">
          <td>{{ user.name }}</td>
          <td>{{ user.time }} hr</td>
          <td>{{ user.points }} Points</td>
          <td>{{ user.rank }}</td>
        </tr>
      </tbody>
    </table>
    
    <h3 class="text-lg font-semibold mt-6">SDGs Impacted</h3>
    <div class="grid grid-cols-1 gap-4 mt-4">
      <div v-for="sdg in sdgs" :key="sdg.title" class="border p-4 rounded-lg">
        <h4 class="font-bold">{{ sdg.title }} : {{ sdg.description }}</h4>
        <p>Time Donated : {{ sdg.time }}</p>
        <p>Money Saved : ₹ {{ sdg.moneySaved }}</p>
      </div>
    </div>
  </div>
    </aside>
  </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Navbar from  '../components/Navbar.vue';

const users = ref([
  { name: "You", time: 5, points: 12, rank: 10 },
  { name: "Abhinav", time: 22, points: 55, rank: 3 },
  { name: "Aishwarya Naidu", time: 20, points: 52, rank: 4 },
  { name: "Parul Tushar", time: 16, points: 44, rank: 5 },
  { name: "Saurabh Madan", time: 11, points: 41, rank: 6 },
  { name: "Gunjan Lal", time: 10, points: 39, rank: 7 },
  { name: "Anaya Kushwah", time: 9, points: 36, rank: 8 },
  { name: "Shefali Chawla", time: 8, points: 23, rank: 9 },
]);

const sdgs = ref([
  { title: "SDG 2", description: ": Zero Hunger", time: "1 hr", moneySaved: 188 },
  { title: "SDG 10", description: ": Reduced Inequalities", time: "1 hr", moneySaved: 188 },
  { title: "SDG 4", description: ": Quality Education", time: "1 hr", moneySaved: 188 },
]);
</script>

<style>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>