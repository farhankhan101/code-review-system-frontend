<template>
  <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
    <div class="w-full">
      <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
        Get your free account now.
      </h1>

      <p class="mt-4 text-gray-500 dark:text-gray-400">
        Let’s get you all set up so you can verify your personal account and begin setting up your profile.
      </p>
      <VeeForm :validation-schema="validationSchema" v-slot="{ meta, values, errors }" @submit="handleSignUp" ref="signupForm" class="space-y-4">
				<div class="relative w-full">
					<label class="block mb-1 text-md font-medium text-gray-900 dark:text-white" for="account_image">
						Username:
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg id='Mail_Sign_At_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
								<g transform="matrix(1.43 0 0 1.43 12 12)" >
								<g style="" >
								<g transform="matrix(1 0 0 1 0.03 0)" >
								<path style="stroke: rgb(65,71,213); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-7.03, -7)" d="M 9.91344 6.99985 C 9.91336 7.56831 9.74533 8.12407 9.43043 8.59735 C 9.11554 9.07062 8.66783 9.44031 8.14353 9.65998 C 7.61923 9.87965 7.04172 9.93952 6.48351 9.83205 C 5.92529 9.72459 5.41128 9.45459 5.00601 9.05597 C 4.60074 8.65734 4.32228 8.14786 4.20561 7.5915 C 4.08893 7.03514 4.13924 6.45671 4.35022 5.92885 C 4.5612 5.40099 4.92344 4.94724 5.39144 4.62457 C 5.85945 4.3019 6.41236 4.1247 6.98074 4.11522 C 7.36358 4.10884 7.74386 4.17874 8.09941 4.32085 C 8.45496 4.46295 8.77865 4.67442 9.05163 4.94292 C 9.3246 5.21142 9.54139 5.53158 9.68936 5.88473 C 9.83732 6.23788 9.91349 6.61695 9.91344 6.99985 L 9.91344 6.99985 Z" stroke-linecap="round" />
								</g>
								<g transform="matrix(1 0 0 1 -0.02 0)" >
								<path style="stroke: rgb(65,71,213); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-6.98, -7)" d="M 9.91341 7.00001 L 9.91341 8.25002 C 9.91341 11.6058 15.173 8.44233 12.4134 3.88462 C 11.8577 2.93563 11.0646 2.14759 10.1121 1.59798 C 9.15958 1.04838 8.08041 0.756144 6.98071 0.75 C 6.05683 0.752853 5.14507 0.960495 4.31106 1.35798 C 3.47706 1.75546 2.74154 2.3329 2.15746 3.04874 C 1.57338 3.76457 1.15527 4.60099 0.933212 5.49779 C 0.711156 6.39459 0.690682 7.32947 0.873264 8.23514 C 1.05585 9.1408 1.43694 9.99473 1.98912 10.7354 C 2.5413 11.4762 3.25083 12.0852 4.06664 12.5189 C 4.88245 12.9525 5.78424 13.1998 6.70711 13.2431 C 7.62998 13.2864 8.55097 13.1246 9.4038 12.7693" stroke-linecap="round" />
								</g>
								</g>
								</g>
							</svg>
						</div>
						<VeeField type="text" name="username" :validate-on-input="true" v-model="formData.username" @input="checkUsername" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" />
					</div>
					<div class="flex flex-col">
						<VeeError name="username" class="text-red-600" />
						<span v-if="usernameError?.length>0" class="text-red-600">{{ usernameError }}</span>
					</div>
				</div>
				<div class="relative w-full">
					<label class="block mb-1 text-md font-medium text-gray-900 dark:text-white" for="account_image">
						Email:
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg id='Mail_Send_Envelope_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
								<g transform="matrix(1.43 0 0 1.43 12 12)" >
								<g style="" >
								<g transform="matrix(1 0 0 1 0 0)" >
								<path style="stroke: rgb(65,71,213); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(215,224,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-7, -7)" d="M 1.03167 10.5367 C 1.15058 11.4945 1.92435 12.2511 2.88428 12.3515 C 4.21258 12.4903 5.58924 12.6369 7 12.6369 C 8.41076 12.6369 9.78742 12.4903 11.1157 12.3515 C 12.0756 12.2511 12.8494 11.4945 12.9683 10.5367 C 13.1103 9.39313 13.25 8.21051 13.25 6.99998 C 13.25 5.78944 13.1103 4.60683 12.9683 3.46329 C 12.8494 2.50549 12.0756 1.74885 11.1157 1.6485 C 9.78742 1.50965 8.41076 1.36304 7 1.36304 C 5.58924 1.36304 4.21257 1.50965 2.88428 1.6485 C 1.92435 1.74885 1.15058 2.50549 1.03166 3.46329 C 0.88969 4.60683 0.75 5.78944 0.75 6.99998 C 0.75 8.21051 0.88969 9.39313 1.03167 10.5367 Z" stroke-linecap="round" />
								</g>
								<g transform="matrix(1 0 0 1 0 -1.73)" >
								<path style="stroke: rgb(65,71,213); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-7, -5.27)" d="M 1.05957 3.20435 L 5.76169 6.91181 C 6.48793 7.48443 7.51207 7.48443 8.23831 6.91181 L 12.9404 3.20435" stroke-linecap="round" />
								</g>
								</g>
								</g>
							</svg>
						</div>
						<VeeField type="email" name="email" :validate-on-input="true" v-model="formData.email" @input="checkEmail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email address" />
					</div>
					<div class="flex flex-col">
						<VeeError name="email" class="text-red-600" />
						<span v-if="emailError?.length>0" class="text-red-600">{{ emailError }}</span>
					</div>
				</div>
				<div class="relative flex w-full gap-4">
					<div class="relative w-1/2">
						<label class="block mb-1 text-md font-medium text-gray-900 dark:text-white" for="account_image">
							Password:
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg id='Login_Password_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
									<g transform="matrix(1.43 0 0 1.43 12 12)" >
									<g style="" >
									<g transform="matrix(1 0 0 1 -0.46 -2.27)" >
									<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(137,220,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-6.54, -4.73)" d="M 0.941675 6.97613 C 1.07838 7.97 1.94086 8.71118 2.9441 8.71118 L 10.1367 8.71118 C 11.14 8.71118 12.0025 7.97 12.1392 6.97613 C 12.2434 6.21851 12.3308 5.43336 12.3308 4.73059 C 12.3308 4.02782 12.2434 3.24267 12.1392 2.48506 C 12.0025 1.49118 11.14 0.75 10.1367 0.75 L 2.9441 0.75 C 1.94086 0.75 1.07838 1.49118 0.941674 2.48505 C 0.837469 3.24266 0.75 4.02782 0.75 4.73059 C 0.75 5.43336 0.837469 6.21852 0.941675 6.97613 Z" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 -0.47 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-6.53, -4.73)" d="M 5.70094 8.71118 L 2.9441 8.71118 C 1.94086 8.71118 1.07838 7.97 0.941675 6.97613 C 0.837469 6.21852 0.75 5.43336 0.75 4.73059 C 0.75 4.02782 0.837469 3.24266 0.941674 2.48505 C 1.07838 1.49118 1.94086 0.75 2.9441 0.75 L 10.1367 0.75 C 11.14 0.75 12.0025 1.49119 12.1392 2.48507 C 12.2083 2.98763 12.27 3.50231 12.3038 3.99702" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 -3.21 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-3.79, -4.73)" d="M 3.78662 4.60254 L 3.78662 4.85864" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 -0.46 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-6.54, -4.73)" d="M 6.54053 4.60254 L 6.54053 4.85864" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 2.29 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-9.29, -4.73)" d="M 9.29419 4.60254 L 9.29419 4.85864" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 3.65 1.53)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-10.65, -8.53)" d="M 12.24 9.73438 L 12.24 8.92639 C 12.24 8.7174 12.1988 8.51046 12.1188 8.31738 C 12.0389 8.1243 11.9216 7.94886 11.7739 7.80108 C 11.6261 7.6533 11.4507 7.53608 11.2576 7.4561 C 11.0645 7.37612 10.8575 7.33496 10.6486 7.33496 C 10.4396 7.33496 10.2326 7.37612 10.0395 7.4561 C 9.84646 7.53608 9.67103 7.6533 9.52325 7.80108 C 9.37547 7.94886 9.25825 8.1243 9.17827 8.31738 C 9.09829 8.51046 9.05713 8.7174 9.05713 8.92639 L 9.05713 9.73438" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 3.65 4.49)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-10.65, -11.49)" d="M 8.09216 12.7828 C 8.13083 13.0186 8.32618 13.1999 8.56446 13.2179 C 9.23198 13.2684 9.93008 13.3349 10.6486 13.3349 C 11.3672 13.3349 12.0653 13.2684 12.7328 13.2179 C 12.9711 13.1999 13.1665 13.0186 13.2051 12.7828 C 13.2731 12.3682 13.3488 11.9371 13.3488 11.4945 C 13.3488 11.0519 13.2731 10.6207 13.2051 10.2061 C 13.1665 9.97029 12.9711 9.78902 12.7328 9.77101 C 12.0653 9.72053 11.3672 9.65399 10.6486 9.65399 C 9.93008 9.65399 9.23198 9.72053 8.56446 9.77101 C 8.32618 9.78902 8.13083 9.97029 8.09216 10.2061 C 8.02416 10.6207 7.94849 11.0519 7.94849 11.4945 C 7.94849 11.9371 8.02416 12.3682 8.09216 12.7828 Z" stroke-linecap="round" />
									</g>
									</g>
									</g>
								</svg>
							</div>
							<button
								type="button"
								@click="togglePasswordVisibility('password')"
								class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400">
								<svg v-if="isPasswordVisible"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
									<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
								</svg>
								<svg v-else xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-closed">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
									<path d="M3 15l2.5 -3.8" />
									<path d="M21 14.976l-2.492 -3.776" />
									<path d="M9 17l.5 -4" />
									<path d="M15 17l-.5 -4" />
								</svg>
							</button>
							<VeeField name="password" v-model="formData.password" :type="isPasswordVisible ? 'text' : 'password'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" />
						</div>
						<VeeError name="password" class="text-red-600" />
					</div>
					<div class="relative w-1/2">
						<label class="block mb-1 text-md font-medium text-gray-900 dark:text-white" for="account_image">
							Confirm Password:
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg id='Login_Password_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
									<g transform="matrix(1.43 0 0 1.43 12 12)" >
									<g style="" >
									<g transform="matrix(1 0 0 1 -0.46 -2.27)" >
									<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(137,220,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-6.54, -4.73)" d="M 0.941675 6.97613 C 1.07838 7.97 1.94086 8.71118 2.9441 8.71118 L 10.1367 8.71118 C 11.14 8.71118 12.0025 7.97 12.1392 6.97613 C 12.2434 6.21851 12.3308 5.43336 12.3308 4.73059 C 12.3308 4.02782 12.2434 3.24267 12.1392 2.48506 C 12.0025 1.49118 11.14 0.75 10.1367 0.75 L 2.9441 0.75 C 1.94086 0.75 1.07838 1.49118 0.941674 2.48505 C 0.837469 3.24266 0.75 4.02782 0.75 4.73059 C 0.75 5.43336 0.837469 6.21852 0.941675 6.97613 Z" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 -0.47 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-6.53, -4.73)" d="M 5.70094 8.71118 L 2.9441 8.71118 C 1.94086 8.71118 1.07838 7.97 0.941675 6.97613 C 0.837469 6.21852 0.75 5.43336 0.75 4.73059 C 0.75 4.02782 0.837469 3.24266 0.941674 2.48505 C 1.07838 1.49118 1.94086 0.75 2.9441 0.75 L 10.1367 0.75 C 11.14 0.75 12.0025 1.49119 12.1392 2.48507 C 12.2083 2.98763 12.27 3.50231 12.3038 3.99702" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 -3.21 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-3.79, -4.73)" d="M 3.78662 4.60254 L 3.78662 4.85864" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 -0.46 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-6.54, -4.73)" d="M 6.54053 4.60254 L 6.54053 4.85864" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 2.29 -2.27)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-9.29, -4.73)" d="M 9.29419 4.60254 L 9.29419 4.85864" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 3.65 1.53)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-10.65, -8.53)" d="M 12.24 9.73438 L 12.24 8.92639 C 12.24 8.7174 12.1988 8.51046 12.1188 8.31738 C 12.0389 8.1243 11.9216 7.94886 11.7739 7.80108 C 11.6261 7.6533 11.4507 7.53608 11.2576 7.4561 C 11.0645 7.37612 10.8575 7.33496 10.6486 7.33496 C 10.4396 7.33496 10.2326 7.37612 10.0395 7.4561 C 9.84646 7.53608 9.67103 7.6533 9.52325 7.80108 C 9.37547 7.94886 9.25825 8.1243 9.17827 8.31738 C 9.09829 8.51046 9.05713 8.7174 9.05713 8.92639 L 9.05713 9.73438" stroke-linecap="round" />
									</g>
									<g transform="matrix(1 0 0 1 3.65 4.49)" >
									<path style="stroke: rgb(38,133,245); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-10.65, -11.49)" d="M 8.09216 12.7828 C 8.13083 13.0186 8.32618 13.1999 8.56446 13.2179 C 9.23198 13.2684 9.93008 13.3349 10.6486 13.3349 C 11.3672 13.3349 12.0653 13.2684 12.7328 13.2179 C 12.9711 13.1999 13.1665 13.0186 13.2051 12.7828 C 13.2731 12.3682 13.3488 11.9371 13.3488 11.4945 C 13.3488 11.0519 13.2731 10.6207 13.2051 10.2061 C 13.1665 9.97029 12.9711 9.78902 12.7328 9.77101 C 12.0653 9.72053 11.3672 9.65399 10.6486 9.65399 C 9.93008 9.65399 9.23198 9.72053 8.56446 9.77101 C 8.32618 9.78902 8.13083 9.97029 8.09216 10.2061 C 8.02416 10.6207 7.94849 11.0519 7.94849 11.4945 C 7.94849 11.9371 8.02416 12.3682 8.09216 12.7828 Z" stroke-linecap="round" />
									</g>
									</g>
									</g>
								</svg>
							</div>
							<!-- Eye Icon to Toggle Password Visibility -->
							<button
								type="button"
								@click="togglePasswordVisibility('confirm')"
								class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400">
								<svg v-if="isConfirmPasswordVisible"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
									<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
								</svg>
								<svg v-else xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-closed">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
									<path d="M3 15l2.5 -3.8" />
									<path d="M21 14.976l-2.492 -3.776" />
									<path d="M9 17l.5 -4" />
									<path d="M15 17l-.5 -4" />
								</svg>
							</button>

							<!-- Password Confirmation Field -->
							<VeeField
							name="password_confirmation"
							v-model="formData.password_confirmation"
							:type="isPasswordVisible ? 'text' : 'password'"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Enter your password again"
							/>
						</div>
						<!-- Error Message -->
						<VeeError name="password_confirmation" class="text-red-600" />
						</div>
				</div>
				<div class="flex"></div>
				<button type="submit" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-full">
					<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full" :disabled="isLoading">
						<span v-if="isLoading" class="loading loading-infinity loading-md"></span>
						<span v-else>Sign Up</span>
					</span>
				</button>
			</VeeForm>
			<p class="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
				Already have an account? <router-link to="/auth#login"  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</router-link>.
			</p>
		</div>
	</div>
</template>
<script lang="ts">
import { z } from "zod";
import { onMounted, ref, reactive, computed, defineComponent, watch } from 'vue';
import { 
  ErrorMessage as VeeError,
  Field as VeeField, 
  Form as VeeForm,
  useForm as useVeeForm 
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { signupFormSchema } from "@/schemas/signupFormSchema";
import Swal from "sweetalert2";
import ApiService from "@/core/services/ApiService";
import axios from 'axios';

export default defineComponent({
	name: "SignUp",
	components: {
    VeeError,
		VeeField, VeeForm
	},
	setup() {
		const router = useRouter();
		const store = useAuthStore();
		const isLoading = ref(false);

		const checkingUsername = ref(false);
		const usernameError = ref('');

		const checkingEmail = ref(false);
		const emailError = ref('');

		const validationSchema = toTypedSchema(signupFormSchema);

		const signupForm = ref(null);

		const formData = reactive({
			username: '',
			email: '',
			password: '',
			password_confirmation: ''
		})
		const anError = store.abcError
		const { 
			meta,       // Form validation meta
			errors,     // Validation errors
			resetForm,  // Reset form method
			validate,    // Manual validation method
			setFieldValue, // Set form field value method
			setFieldError,
		} = useVeeForm({
			validationSchema,
			initialValues: formData
		})
		let checkError;
		const isFormValid = computed(() => meta.value.valid)

		
		function debounce(func, wait) {
			let timeout;
			return function (...args) {
				return new Promise((resolve, reject) => {
					clearTimeout(timeout);
					timeout = setTimeout(async () => {
						try {
							const result = await func.apply(this, args);
							resolve(result);
						} catch (error) {
							reject(error);
						}
					}, wait);
				});
			};
		}

		const checkAvailability = debounce(async (field, value) => {
			try {
				console.log('fuck you ',field,value)
				if (field === 'U') {
					checkingUsername.value = true;
					try {
						const response = await ApiService.query(`/api/v2/user/validate_username/${value}/`,{});
						console.log('username check response:', response);
						if (response.data.status == 'S') {
              				usernameError.value = '';
						} else {
							usernameError.value = 'Username is already taken';
						}
					} catch (error) {
						console.error('Username Check Error:', error);
						if(error.message == 'Network Error'){
							Swal.fire ({
								'icon' : 'error',
								'title' : 'Error' ,
								'text' : `${error}`
							});
						}
						else{
							usernameError.value = 'Username is already taken';
						}
					}
					checkingUsername.value = false;
				} else if (field === 'E') {
					checkingEmail.value = true;
					try {
						const response = await ApiService.query(`/api/v2/user/validate_email	/${value}/`, {});
						console.log('email check response:', response);
						
						if (response.data.status=='S') {
							emailError.value = '';
						} else {
							console.log('email is taken')
							emailError.value = 'Email is already taken';
						}
					} catch (error) {
						console.error('Email Check Error:', error);
						if (error.message == 'Network Error') {
							Swal.fire ({
								'icon' : 'error',
								'title' : 'Error' ,
								'text' : `${error}`
							});
						} else {
							emailError.value = 'Email is already taken';
						}
					}
					checkingEmail.value = false;
				}
			} catch (error) {
				console.error(error);
			}
		}, 500);

		const handleSignUp = async (formValues, { setErrors }) => {
			console.log('Form Values:', formValues);
			const results = signupFormSchema.safeParse(formValues);
			console.log("setErrors:", results, setErrors)
			if (!results.success) {
				// setErrors(results.error.errors);
				return Swal.fire({
					'icon': 'error',
					'title': 'Validation Error',
					'text': 'Please check the form for errors.',
				})
			}

			try {

				isLoading.value = true;

				if (usernameError.value.length>0 || emailError.value.length>0) {
					Swal.fire({
						icon: 'error',
						title: 'Please fix the errors in the form',
						text: 'Username and Email must be unique',
					});
					isLoading.value = false;
					return;
				}

				await store.signup(formValues);
				const checkError = Object.values(store.errors);
				// console.log("pta nahi kya ha ,",checkError)
				if (checkError.length === 0) {
					router.push({path: '/auth', hash: '#completeProfile'});
				} else {
					Swal.fire({
						title: checkError[0] as string,
						html: checkError[1].includes('<ul')?checkError[1]:`<span class="text-danger">${checkError[1]}</span>` as string,
						icon: 'error',
						buttonsStyling: false,
						confirmButtonText: 'Try again!',
						heightAuto: false,
						customClass: {
							confirmButton: 'btn fw-semibold btn-light-danger',
						},
					}).then(() => {
						store.errors = {};
					});
				}
			} catch (error) {
				console.log('Caught Error:', error);
				console.error('Login failed:', error);
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong - Login failed...',
					message: error.response.data
				})
			}

			isLoading.value = false;
		};

		const checkUsername = () => {
			console.log('Username changed')
			if (!checkError){
				console.log("check there", checkError)
				checkAvailability('U', formData.username);
			}
		};

		const checkEmail = () => {
			console.log('Email changed')
			if (!checkError){
				console.log("check there", checkError)

				checkAvailability('E', formData.email);
			}
			console.log("Form Data fuck ",formData.email)
		};

		const isPasswordVisible = ref(false);
		const isConfirmPasswordVisible = ref(false);

		const togglePasswordVisibility = (key) => {
			if (key == 'confirm'){
				isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
			} else if (key == 'password') {
				isPasswordVisible.value = !isPasswordVisible.value;
			}
		}

		

		return {
			formData,
			validationSchema,
			handleSignUp,
			signupForm, 
			isLoading,
			usernameError,
			emailError,
			checkUsername, checkEmail , togglePasswordVisibility,
			isPasswordVisible, isConfirmPasswordVisible
		};
	}
})
</script>