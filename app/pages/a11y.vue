<template>
	<div class="isolate" ref="root">
		<Title>Accessibility Solutions</Title>
		<div
			class="z-10 grid mt-44 grid-cols-1 grid-rows-1 transition-all duration-500"
			:class="{ 'mt-5': loading || loaded }"
		>
			<input
				type="url"
				v-model="link"
				@keydown.enter="search"
				:disabled="loading"
				class="m-auto w-[800px] max-w-[90%] custom-shadow h-[60px] focus:outline-none focus:outline-2 outline-sky border border-sky/30 font-mulish rounded-md px-4 py-2 col-start-1 row-start-1"
				@focusin="showPlaceholder = false"
				@focusout="revealPlaceholder"
				@input="showPlaceholder = false"
			/>
			<Transition mode="in-out" name="fade">
				<div
					class="m-auto h-[60px] w-[800px] max-w-[90%] pointer-events-none flex font-semibold items-center px-4 top-0 left-0 col-start-1 row-start-1 text-dark/50 max-sm:text-sm"
					v-if="showPlaceholder"
				>
					Enter URL Link
					<span class="mx-1">
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_35_40)">
								<path
									d="M8.33326 10.8333C8.69113 11.3118 9.14772 11.7076 9.67205 11.9941C10.1964 12.2806 10.7762 12.4509 11.3721 12.4936C11.9681 12.5363 12.5662 12.4503 13.126 12.2415C13.6858 12.0327 14.1942 11.7059 14.6166 11.2833L17.1166 8.78333C17.8756 7.99749 18.2956 6.94498 18.2861 5.85249C18.2766 4.76 17.8384 3.71495 17.0658 2.94242C16.2933 2.16989 15.2482 1.73168 14.1558 1.72219C13.0633 1.71269 12.0108 2.13267 11.2249 2.89166L9.79159 4.31666M11.6666 9.16666C11.3087 8.68822 10.8521 8.29234 10.3278 8.00588C9.80347 7.71942 9.22367 7.54907 8.62771 7.50638C8.03176 7.4637 7.4336 7.54969 6.8738 7.75851C6.314 7.96733 5.80566 8.2941 5.38326 8.71666L2.88326 11.2167C2.12426 12.0025 1.70429 13.055 1.71378 14.1475C1.72327 15.24 2.16148 16.285 2.93401 17.0576C3.70655 17.8301 4.7516 18.2683 5.84408 18.2778C6.93657 18.2873 7.98908 17.8673 8.77492 17.1083L10.1999 15.6833"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_35_40">
									<rect width="20" height="20" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</span>
					or Repository Link
					<span class="mx-1">
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_34_18)">
								<path
									d="M7.50008 15.8333C3.33341 17.0833 3.33341 13.75 1.66675 13.3333M13.3334 18.3333V15.1083C13.3647 14.711 13.311 14.3115 13.1759 13.9365C13.0409 13.5615 12.8275 13.2195 12.5501 12.9333C15.1667 12.6417 17.9167 11.65 17.9167 7.1C17.9165 5.93652 17.469 4.81766 16.6667 3.975C17.0466 2.95709 17.0198 1.83196 16.5917 0.833332C16.5917 0.833332 15.6084 0.541666 13.3334 2.06667C11.4234 1.54902 9.41007 1.54902 7.50008 2.06667C5.22508 0.541666 4.24175 0.833332 4.24175 0.833332C3.81373 1.83196 3.78687 2.95709 4.16675 3.975C3.35852 4.82392 2.91052 5.95288 2.91675 7.125C2.91675 11.6417 5.66675 12.6333 8.28341 12.9583C8.00925 13.2416 7.7978 13.5795 7.66284 13.9499C7.52788 14.3204 7.47242 14.7151 7.50008 15.1083V18.3333"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_34_18">
									<rect width="20" height="20" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</span>
				</div>
			</Transition>
		</div>
		<Transition name="slow-fade" mode="out-in">
			<div
				class="w-10/12 max-sm:w-[98%] h-10/12 bg-navy/30 m-auto mt-6 pb-12 rounded-lg backdrop-blur"
				v-if="loading || loaded"
			>
				<div class="w-11/12 m-auto pt-14 max-sm:pt-4">
					<img
						v-for="response of results"
						:src="`data:image/png;base64, ${response.result?.screenshot}`"
						:alt="response.result?.url"
						class="w-full object-cover aspect-video object-top rounded mb-4"
						v-if="loaded"
					/>
					<div
						class="animate-pulse bg-white/50 aspect-video w-[1920px] max-w-full rounded"
						v-if="loading"
					></div>
				</div>
				<div class="flex w-11/12 gap-4 m-auto max-sm:flex-col" v-if="loaded">
					<div class="w-full flex bg-dark p-8 max-sm:px-0 max-sm:py-4 rounded-md">
						<div class="m-auto w-10/12 border-[#E0EAFC] border rounded-t-3xl rounded-b">
							<h1
								class="flex justify-center items-center w-full gap-2 p-4 max-sm:p-2 font-serif text-3xl max-sm:text-xl max-sm:items-start"
							>
								<svg
									width="26"
									height="26"
									viewBox="0 0 26 26"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="max-sm:w-5 max-sm:h-5 max-sm:mt-1"
								>
									<path
										d="M13 25.5C6.09644 25.5 0.5 19.9035 0.5 13C0.5 6.09644 6.09644 0.5 13 0.5C19.9035 0.5 25.5 6.09644 25.5 13C25.5 19.9035 19.9035 25.5 13 25.5ZM13 23C18.5229 23 23 18.5229 23 13C23 7.47715 18.5229 3 13 3C7.47715 3 3 7.47715 3 13C3 18.5229 7.47715 23 13 23ZM14.25 11.125V16.75H15.5V19.25H10.5V16.75H11.75V13.625H10.5V11.125H14.25ZM14.875 8C14.875 9.03554 14.0355 9.875 13 9.875C11.9645 9.875 11.125 9.03554 11.125 8C11.125 6.96446 11.9645 6.125 13 6.125C14.0355 6.125 14.875 6.96446 14.875 8Z"
										fill="#E0EAFC"
									/>
								</svg>
								<span class="font-semibold text-[#E0EAFC]">{{ rating.hero }}</span>
							</h1>
							<p
								class="text-center px-6 max-sm:px-3 text-balance py-2 max-sm:py-1 bg-[#E0EAFC] text-dark"
							>
								<span>{{ rating.message }}</span>
							</p>
						</div>
					</div>
					<div class="w-full">
						<div class="m-auto bg-white w-full flex justify-center rounded-md">
							<Pie :data="pieData" class="max-sm:h-40" />
						</div>
					</div>
				</div>
				<div
					class="bg-navy/50 p-4 w-11/12 m-auto rounded-lg mt-4 max-sm:w-full max-sm:p-2"
					v-if="loading || loaded"
				>
					<div
						class="flex bg-dark rounded-md p-1 w-full gap-2 overflow-auto no-scrollbar max-sm:flex-col"
					>
						<div
							@click="tab = 'critical'"
							:class="{ 'tab-active': tab === 'critical' }"
							class="flex p-2 items-center justify-center max-sm:justify-start max-sm:pl-8 gap-2 bg-dark/20 ring-peach cursor-pointer hover:ring-1 ring-inset transition-shadow text-white w-full rounded"
						>
							<svg
								viewBox="0 0 13 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="w-4 h-4"
							>
								<path
									d="M6.5 12.75C3.04822 12.75 0.25 9.95175 0.25 6.5C0.25 3.04822 3.04822 0.25 6.5 0.25C9.95175 0.25 12.75 3.04822 12.75 6.5C12.75 9.95175 9.95175 12.75 6.5 12.75ZM6.5 11.5C9.26144 11.5 11.5 9.26144 11.5 6.5C11.5 3.73857 9.26144 1.5 6.5 1.5C3.73857 1.5 1.5 3.73857 1.5 6.5C1.5 9.26144 3.73857 11.5 6.5 11.5ZM5.875 8.375H7.125V9.625H5.875V8.375ZM5.875 3.375H7.125V7.125H5.875V3.375Z"
									fill="white"
								/>
							</svg>
							<div
								class="flex gap-2 max-sm:w-full max-sm:justify-between last:mr-3 items-center"
							>
								<span>Critical Issues</span>
								<span>({{ criticalIssuesCount }})</span>
							</div>
						</div>
						<div
							@click="tab = 'inapplicable'"
							:class="{ 'tab-active': tab === 'inapplicable' }"
							class="flex p-2 bg-dark/20 items-center max-sm:justify-start max-sm:pl-8 justify-center gap-2 text-white w-full ring-peach cursor-pointer hover:ring-1 ring-inset rounded transition-shadow max-sm:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-[18px]"
							>
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"
								></path>
							</svg>
							<div
								class="flex gap-2 max-sm:w-full max-sm:justify-between last:mr-3 items-center"
							>
								<span>Inapplicable Issues</span>
								<span>({{ inapplicableIssuesCount }})</span>
							</div>
						</div>
						<div
							@click="tab = 'incomplete'"
							:class="{ 'tab-active': tab === 'incomplete' }"
							class="flex p-2 bg-dark/20 items-center max-sm:justify-start max-sm:pl-8 justify-center gap-2 text-white w-full ring-peach cursor-pointer hover:ring-1 ring-inset rounded transition-shadow"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-[18px]"
							>
								<path
									d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM15.5355 7.05025L16.9497 8.46447L12 13.4142L10.5858 12L15.5355 7.05025Z"
								></path>
							</svg>
							<div
								class="flex gap-2 max-sm:w-full max-sm:justify-between last:mr-3 items-center"
							>
								<span>Incomplete Issues</span>
								<span>({{ incompleteIssuesCount }})</span>
							</div>
						</div>
						<div
							@click="tab = 'pass'"
							:class="{ 'tab-active': tab === 'pass' }"
							class="flex p-2 items-center justify-center max-sm:justify-start max-sm:pl-8 gap-2 text-white w-full bg-dark/20 ring-peach cursor-pointer hover:ring-1 ring-inset rounded transition-shadow"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-[18px]"
							>
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
								></path>
							</svg>
							<div
								class="flex gap-2 max-sm:w-full max-sm:justify-between last:mr-3 items-center"
							>
								<span>Passed Checks</span>
								<span> ({{ passChecksCount }})</span>
							</div>
						</div>
					</div>
					<div class="flex w-full items-center gap-2 text-white relative overflow-x-auto">
						<Transition mode="out-in">
							<table class="bg-navy mt-3 table-fixed w-full rounded p-2" :key="tab">
								<colgroup>
									<col class="w-[5%] max-sm:w-[8%]" />
									<col class="w-[45%] max-sm:w-[78%]" />
									<col style="width: 20%" class="max-sm:hidden" />
									<col style="width: 30%" class="max-sm:hidden" />
								</colgroup>
								<thead
									class="text-white rounded uppercase font-mono border-b border-b-white"
								>
									<tr>
										<th class="text-center p-2" scope="col">#</th>
										<th class="text-left p-2" scope="col">Issue</th>
										<th class="text-left p-2 max-sm:hidden" scope="col">
											Tags
										</th>
										<th class="max-sm:hidden"></th>
									</tr>
								</thead>
								<tbody>
									<template
										v-for="(listing, index) of listings"
										class="hover:bg-dark/10"
									>
										<tr>
											<Listing
												:listing="listing"
												:index="index"
												@view-details="
													showDetails = index;
													showAll = false;
												"
												:tab="tab"
												@hide-details="showDetails = -1"
											/>
										</tr>
										<Transition name="slide-fade" mode="out-in">
											<tr v-if="showDetails == index || showAll">
												<ListingDetails :listing="listing" :tab="tab" />
											</tr>
										</Transition>
									</template>
									<tr v-for="index in 5" :key="index" v-if="loading">
										<td class="text-center px-1 py-2" v-for="i in 4">
											<div
												class="animate-pulse bg-white/50 p-2 rounded-sm"
											></div>
										</td>
									</tr>
								</tbody>
							</table>
						</Transition>
					</div>
				</div>
			</div>
		</Transition>
		<div class="opacity-0" ref="banners">
			<div class="fixed bottom-0 left-0 -z-10">
				<svg
					width="695"
					height="565"
					viewBox="0 0 695 565"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_26_8)">
						<path
							d="M-14.3887 95.4273L-11.3719 135.452C-8.3552 175.478 -2.32173 255.528 15.8655 319.637C33.722 384.181 64.5592 431.699 130.948 432.588C197.337 433.477 300.932 385.568 361.285 394.373C422.134 402.527 439.743 467.396 476.368 507.323C512.992 547.251 566.979 564.406 609.64 596.417C651.804 629.079 682.641 676.597 730.84 701.343C779.04 726.089 846.256 725.893 852.041 806.269C858.323 885.994 803.174 1046.29 851.952 1070.28C900.4 1094.7 1051.95 983.892 1130.74 968.515C1209.53 953.138 1215.56 1033.19 1251.94 1073.44C1287.99 1114.13 1355.2 1113.93 1385.21 1162.53C1415.22 1211.14 1409.68 1306.37 1451.84 1339.03C1494.5 1371.04 1584.87 1340.48 1609.34 1396.35C1633.32 1452.87 1591.4 1595.82 1627.44 1636.5C1663.82 1676.76 1778.99 1613.66 1827.44 1638.08C1876.21 1662.07 1857.44 1774.65 1881.91 1830.52C1905.89 1887.04 1973.11 1886.85 2015.27 1919.51C2057.93 1951.52 2075.54 2016.39 2100.01 2072.26C2123.98 2128.77 2154.82 2176.29 2233.36 2161.24C2312.4 2145.54 2439.15 2067.27 2530.34 2035.62C2621.53 2003.98 2675.52 2021.13 2712.14 2061.06C2748.77 2100.99 2766.38 2165.86 2754.47 2269.44C2742.06 2373.67 2700.14 2516.62 2736.19 2557.3C2772.57 2597.56 2887.74 2534.47 2945.32 2502.92L3002.91 2471.38L2748.26 2805.37L2727.05 2789.2C2705.84 2773.03 2663.43 2740.7 2621.02 2708.36C2578.61 2676.02 2536.19 2643.69 2493.78 2611.35C2451.37 2579.01 2408.96 2546.68 2366.55 2514.34C2324.13 2482 2281.72 2449.67 2239.31 2417.33C2196.9 2385 2154.49 2352.66 2112.07 2320.32C2069.66 2287.99 2027.25 2255.65 1984.84 2223.31C1942.43 2190.98 1900.01 2158.64 1857.6 2126.3C1815.19 2093.97 1772.78 2061.63 1730.36 2029.29C1687.95 1996.96 1645.54 1964.62 1603.13 1932.28C1560.72 1899.95 1518.3 1867.61 1475.89 1835.27C1433.48 1802.94 1391.07 1770.6 1348.66 1738.26C1306.24 1705.93 1263.83 1673.59 1221.42 1641.25C1179.01 1608.92 1136.59 1576.58 1094.18 1544.24C1051.77 1511.91 1009.36 1479.57 966.946 1447.23C924.534 1414.9 882.122 1382.56 839.71 1350.22C797.297 1317.89 754.885 1285.55 712.473 1253.21C670.061 1220.88 627.649 1188.54 585.237 1156.2C542.825 1123.87 500.413 1091.53 458 1059.2C415.588 1026.86 373.176 994.522 330.764 962.185C288.352 929.849 245.94 897.512 203.528 865.176C161.115 832.839 118.703 800.502 76.2912 768.166C33.8791 735.829 -8.53307 703.493 -50.9452 671.156C-93.3573 638.819 -135.769 606.483 -178.182 574.146C-220.594 541.81 -263.006 509.473 -284.212 493.305L-305.418 477.137L-14.3887 95.4273Z"
							fill="url(#paint0_linear_26_8)"
						/>
						<path
							opacity="0.9"
							d="M-392.248 -17.1243L-346.817 -32.7289C-301.056 -48.7673 -210.69 -79.326 -186.219 -23.4579C-162.244 33.0608 -204.164 176.006 -210.533 272.323C-216.901 368.639 -186.064 416.157 -95.4501 385.273C-4.50554 353.955 111.744 289.404 166.31 305.8C220.546 322.63 213.923 419.322 243.934 467.925C273.944 516.527 318.328 561.248 354.374 601.935C390.751 642.187 419.616 677.321 455.992 717.574C492.038 758.26 595.633 710.351 637.797 743.013C680.457 775.024 661.687 887.607 716.501 903.677C771.315 919.748 898.059 841.476 952.873 857.546C1007.69 873.617 988.917 986.199 1019.51 1034.04C1049.76 1082.32 1128.56 1066.94 1170.97 1099.28C1213.38 1131.62 1219.41 1211.67 1225.45 1291.72C1231.48 1371.77 1237.51 1451.82 1273.89 1492.07C1309.94 1532.76 1377.15 1532.56 1455.69 1517.51C1534.73 1501.81 1625.1 1471.25 1704.14 1455.55C1782.68 1440.49 1849.9 1440.3 1904.13 1457.13C1958.7 1473.52 2001.11 1505.86 2001.11 1593.83C2000.77 1682.23 1958.85 1825.17 1964.64 1905.55C1970.92 1985.27 2024.91 2002.43 2116.1 1970.78C2207.29 1939.14 2334.04 1860.87 2394.89 1869.02C2455.24 1877.83 2449.7 1973.06 2467.56 2037.6C2485.74 2101.71 2528.16 2134.05 2576.6 2158.47C2625.38 2182.46 2679.37 2199.61 2706.94 2207.43L2734.18 2215.68L2479.53 2549.68L2458.33 2533.51C2437.12 2517.34 2394.71 2485.01 2352.3 2452.67C2309.88 2420.33 2267.47 2388 2225.06 2355.66C2182.65 2323.32 2140.23 2290.99 2097.82 2258.65C2055.41 2226.31 2013 2193.98 1970.59 2161.64C1928.17 2129.3 1885.76 2096.97 1843.35 2064.63C1800.94 2032.29 1758.53 1999.96 1716.11 1967.62C1673.7 1935.28 1631.29 1902.95 1588.88 1870.61C1546.47 1838.27 1504.05 1805.94 1461.64 1773.6C1419.23 1741.26 1376.82 1708.93 1334.4 1676.59C1291.99 1644.25 1249.58 1611.92 1207.17 1579.58C1164.76 1547.24 1122.34 1514.91 1079.93 1482.57C1037.52 1450.23 995.107 1417.9 952.695 1385.56C910.283 1353.22 867.871 1320.89 825.459 1288.55C783.047 1256.21 740.635 1223.88 698.222 1191.54C655.81 1159.21 613.398 1126.87 570.986 1094.53C528.574 1062.2 486.162 1029.86 443.75 997.522C401.338 965.186 358.925 932.849 316.513 900.512C274.101 868.176 231.689 835.839 189.277 803.503C146.865 771.166 104.453 738.829 62.0405 706.493C19.6283 674.156 -22.7838 641.82 -65.1959 609.483C-107.608 577.146 -150.02 544.81 -192.432 512.473C-234.844 480.137 -277.257 447.8 -319.669 415.464C-362.081 383.127 -404.493 350.79 -446.905 318.454C-489.317 286.117 -531.729 253.781 -552.935 237.612L-574.142 221.444L-392.248 -17.1243Z"
							fill="url(#paint1_linear_26_8)"
						/>
						<path
							opacity="0.8"
							d="M-87.1461 190.855L-84.1294 230.88C-81.1126 270.905 -75.0792 350.955 -63.0102 423.089C-50.6104 494.79 -33.0019 559.658 -2.41283 607.502C27.8455 655.779 70.2577 688.116 130.859 696.595C191.461 705.075 270.251 689.698 336.888 690.262C403.856 690.392 457.843 707.547 512.657 723.617C567.471 739.688 621.458 756.843 682.308 764.997C742.661 773.802 809.877 773.607 833.852 830.126C858.323 885.994 839.553 998.576 864.023 1054.44C887.998 1110.96 955.214 1110.77 1015.57 1119.57C1076.42 1127.73 1130.4 1144.88 1203.41 1137.1C1276.41 1129.31 1366.78 1098.75 1391.25 1154.62C1415.22 1211.14 1373.3 1354.08 1403.31 1402.69C1433.32 1451.29 1536.92 1403.38 1579.08 1436.04C1621.74 1468.05 1602.97 1580.63 1621.41 1644.42C1639.84 1708.2 1693.83 1725.36 1766.83 1717.57C1839.84 1709.79 1930.2 1679.23 1991.05 1687.38C2051.4 1696.19 2082.24 1743.7 2094.06 1816.16C2105.88 1888.62 2100.34 1983.86 2112.16 2056.31C2123.98 2128.77 2154.82 2176.29 2184.83 2224.9C2214.84 2273.5 2245.68 2321.02 2330.26 2298.05C2414.84 2275.08 2554.81 2179.46 2633.35 2164.41C2712.39 2148.7 2730 2213.57 2724.21 2309.13C2718.09 2405.12 2687.74 2532.88 2693.78 2612.93C2699.81 2692.98 2742.22 2725.32 2763.43 2741.49L2784.63 2757.66L2748.26 2805.37L2727.05 2789.2C2705.84 2773.03 2663.43 2740.7 2621.02 2708.36C2578.61 2676.02 2536.2 2643.69 2493.78 2611.35C2451.37 2579.01 2408.96 2546.68 2366.55 2514.34C2324.13 2482.01 2281.72 2449.67 2239.31 2417.33C2196.9 2385 2154.49 2352.66 2112.07 2320.32C2069.66 2287.99 2027.25 2255.65 1984.84 2223.31C1942.43 2190.98 1900.01 2158.64 1857.6 2126.3C1815.19 2093.97 1772.78 2061.63 1730.36 2029.29C1687.95 1996.96 1645.54 1964.62 1603.13 1932.28C1560.72 1899.95 1518.3 1867.61 1475.89 1835.27C1433.48 1802.94 1391.07 1770.6 1348.66 1738.26C1306.24 1705.93 1263.83 1673.59 1221.42 1641.25C1179.01 1608.92 1136.59 1576.58 1094.18 1544.24C1051.77 1511.91 1009.36 1479.57 966.946 1447.23C924.534 1414.9 882.122 1382.56 839.71 1350.22C797.297 1317.89 754.885 1285.55 712.473 1253.21C670.061 1220.88 627.649 1188.54 585.237 1156.2C542.825 1123.87 500.413 1091.53 458 1059.2C415.588 1026.86 373.176 994.522 330.764 962.185C288.352 929.849 245.94 897.512 203.528 865.176C161.115 832.839 118.703 800.502 76.2911 768.166C33.879 735.829 -8.53314 703.493 -50.9453 671.156C-93.3574 638.819 -135.77 606.483 -178.182 574.146C-220.594 541.81 -263.006 509.473 -284.212 493.305L-305.418 477.137L-87.1461 190.855Z"
							fill="url(#paint2_linear_26_8)"
						/>
					</g>
					<defs>
						<linearGradient
							id="paint0_linear_26_8"
							x1="-305.418"
							y1="477.137"
							x2="41.5457"
							y2="22.0653"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#EE6C4D" />
							<stop offset="1" stop-color="#FFB30B" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_26_8"
							x1="-606.978"
							y1="117.568"
							x2="-284.726"
							y2="-305.092"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#EE6C4D" />
							<stop offset="1" stop-color="#FFB30B" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_26_8"
							x1="-305.418"
							y1="477.137"
							x2="-4.44653"
							y2="82.3872"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#EE6C4D" />
							<stop offset="1" stop-color="#FFB30B" />
						</linearGradient>
						<clipPath id="clip0_26_8">
							<rect
								width="800"
								height="600"
								fill="white"
								transform="translate(58.3687) rotate(37.3232)"
							/>
						</clipPath>
					</defs>
				</svg>
			</div>
			<div class="fixed bottom-0 right-0 -z-10 max-sm:opacity-80">
				<svg
					width="172"
					height="151"
					viewBox="0 0 172 151"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<ellipse cx="171.5" cy="151" rx="171.5" ry="151" fill="#98C1D9" />
				</svg>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { parseURL } from "ufo";
import type { A11yResults } from "~~/shared/types";

definePageMeta({
	middleware: "auth",
});

const showPlaceholder = ref(true);
const link = ref("");
const loading = ref(false);
const loaded = ref(false);
const banners = ref<HTMLDivElement | null>(null);

function revealPlaceholder() {
	if (!link.value) showPlaceholder.value = true;
}

const root = ref<HTMLElement | null>(null);
const results = ref<A11yResults[] | null>(null);

async function search() {
	link.value = link.value.trim();
	results.value = null;

	if (!link.value) return;
	loading.value = true;

	const response = await $fetch<A11yResults | A11yResults[]>(`/api/a11y/assess?q=${link.value}`, {
		onResponseError(error) {
			console.error(error);
			window.alertError(unWrapFetchError(error));
			loaded.value = false;
		},
	}).catch(console.error);

	loading.value = false;
	if (!response) return;
	loaded.value = true;
	results.value = Array.isArray(response) ? response : [response];
}

const criticalIssuesCount = computed(() => {
	if (!results.value) return 0;
	return results.value.reduce((acc, response) => {
		return acc + (response.result?.violations.length || 0);
	}, 0);
});

const inapplicableIssuesCount = computed(() => {
	if (!results.value) return 0;
	return results.value.reduce((acc, response) => {
		return acc + (response.result?.inapplicable.length || 0);
	}, 0);
});

const incompleteIssuesCount = computed(() => {
	if (!results.value) return 0;
	return results.value.reduce((acc, response) => {
		return acc + (response.result?.incomplete.length || 0);
	}, 0);
});

const passChecksCount = computed(() => {
	if (!results.value) return 0;
	return results.value.reduce((acc, response) => {
		return acc + (response.result?.passes.length || 0);
	}, 0);
});

const totalIssuesCount = computed(() => {
	return criticalIssuesCount.value + incompleteIssuesCount.value + passChecksCount.value;
});

const rating = computed(() => {
	if (!results.value)
		return {
			hero: "🤔",
			message: "No data to show",
			score: 0,
		};

	const score = Math.floor((passChecksCount.value / totalIssuesCount.value) * 100);
	const hostname = parseURL(link.value, "https://").host;
	switch (!!score) {
		case score < 50:
			return {
				hero: "Little Compliance 😳",
				score,
				message: `Site ${hostname} has a low compliance score. There are some serious compliance issues.`,
			};
		case score < 75:
			return {
				hero: "Good Compliance 😊",
				score,
				message: `Site ${hostname} has a good compliance score. There are some compliance issues.`,
			};
		case score < 90:
			return {
				hero: "Great Compliance 🥳",
				score,
				message: `Site ${hostname} has a great compliance score. There are a few compliance issues.`,
			};
		default:
			return {
				hero: "Fully Compliant 🎉",
				score,
				message: `Site ${hostname} has an excellent compliance score. There are no compliance issues.`,
			};
	}
});

const pieData = computed<
	{
		name: string;
		value: number;
	}[]
>(() => {
	if (!results.value) return [];
	const data = [
		{ name: "Incomplete", value: incompleteIssuesCount.value },
		{ name: "Pass", value: passChecksCount.value },
		{ name: "Critical", value: criticalIssuesCount.value },
	];
	return data;
});

const tab = ref<"critical" | "inapplicable" | "incomplete" | "pass">("critical");

const listings = computed(() => {
	if (!results.value) return [];
	switch (tab.value) {
		case "critical":
			return results.value.flatMap((result) => result.result?.violations);
		case "inapplicable":
			return results.value.flatMap((result) => result.result?.inapplicable);
		case "incomplete":
			return results.value.flatMap((result) => result.result?.incomplete);
		case "pass":
			return results.value.flatMap((result) => result.result?.passes);
		default:
			return [];
	}
});

const showDetails = ref(-1);
watch(tab, () => {
	showDetails.value = -1;
});
const _showAll = ref(true);
const showAll = computed({
	get: () => {
		return _showAll.value && listings.value.length <= 10 && showDetails.value === -1;
	},
	set: (value: boolean) => {
		_showAll.value = value;
	},
});

function forceTransitionOpacity(val: HTMLElement, opacity: number = 0) {
	if (opacity >= 100) return;
	setTimeout(() => {
		val.classList.add("transition-opacity");
		val.classList.add("duration-1000");
		val.classList.add("delay-1000");
		val.classList.add("opacity-100");
	});
}

onMounted(() => forceTransitionOpacity(banners.value!));
</script>
<style scoped>
.custom-shadow {
	box-shadow:
		0px 2px 4px rgba(61, 90, 128, 0.15),
		inset 0px 2px 4px rgba(188, 190, 192, 0.15);
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave {
	opacity: 1;
}

.slow-fade-enter-active,
.slow-fade-leave-active {
	transition: opacity 0.5s ease;
}

.slow-fade-enter-from,
.slow-fade-leave-to {
	opacity: 0;
}

.tab-active {
	@apply bg-peach;
}

.slide-fade-enter-active {
	transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

.isolate {
	min-height: 100vh;
	min-height: 100dvh;
}
</style>
