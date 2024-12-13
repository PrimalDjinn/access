<template>
	<div class="w-full m-auto flex flex-col max-sm:w-full pb-36 absolute top-0 pt-20" style="background: radial-gradient(100.76% 179.14% at -2.4% -2.78%, #FFFFFF 25.3%, #E0FBFC 100%)">
		<div class="w-full">
			<Title>A11y | About</Title>
			<div
				class="w-9/12 m-auto border border-sky bg-light/20 rounded-2xl max-sm:rounded max-w-[90vw] p-10 shadow-md shadow-sky max-sm:mt-10 max-sm:w-full max-sm:p-5 mt-20"
			>
				<h2 class="text-lg uppercase font-serif ml-2">A11Y</h2>
				<h1
					class="font-sans font-bold text-6xl text-left max-sm:mt-6 text-dark max-sm:text-5xl ml-2"
				>
					About <span class="text-peach">A11Y</span>
				</h1>
				<p class="p-2 mt-4 pl-5 text-lg text-gray-600 font-bold">
					Accessibility is incredibly important, yet often overlooked in traditional
					digital design and development education. Because of this, The A11Y Project
					strives to be a living example of how to create beautiful, accessible, and
					inclusive digital experiences.
				</p>
				<div class="content">
					<h1>
						What does the term
						<blockquote class="inline">A11Y</blockquote>
						mean?
					</h1>
					<p>
						“a11y” stands for “accessibility.” It is a numeronym, with 11 representing
						the count of letters between the letter a and the letter y. Other numeronyms
						you may be familiar with include: i18n (internationalization), P2P (peer to
						peer), WWII (World War 2), etc. The word accessibility has different
						meanings in different contexts. On the internet, the use of the term a11y
						helps to identify content related specifically to digital accessibility. For
						example, it is often used as a Twitter hashtag by digital accessibility
						practitioners.
					</p>
					<h2>Disability</h2>
					<p>
						<a
							href="https://www.cdc.gov/ncbddd/disabilityandhealth/infographic-disability-impacts-all.html"
							>One in four people in the United States has a disability.</a
						>
						For many, technology built with accessibility in mind makes things easier.
						For people with disabilities, technology makes things possible. Websites and
						apps can be made to work in such a way that it can be understood by
						assistive technology such as screen readers, refreshable braille displays,
						and screen magnifiers. Many disabled people rely on such devices to do
						things like order food, pay taxes, apply to jobs, and talk with their
						friends and family. Additionally, websites and web apps can be designed to
						be understood by the widest possible audience. This includes accommodating
						things like colorblindness, Dyslexia and Dyscalculia, seizure and migraine
						triggers, as well as reading comprehension level and cognitive load.
					</p>
					<h2>Inclusion</h2>
					<p>
						Accessibility is important. Inclusion is essential. Without representation,
						it is impossible to understand, much less effectively make accessible
						digital experiences. In addition, accessibility work is oftentimes done
						after the fact to great expense. Inclusivity asks people making digital
						experiences to consider early and often what barriers and biases might keep
						people from being present, and what they can do about it.
					</p>
					<h2>Law</h2>
					<p>
						In many countries, accessibility is a right protected by law, the same way
						protections for people's race, religion, and gender are upheld. Depriving
						someone of access is illegal and immoral.
					</p>
					<h2>Opportunity</h2>
					<p>
						Making things accessible translates to better opportunities, as it means
						more people can use them. Accessible digital experiences also remove
						barriers. This is incredibly important for things like employment, an area
						where disabled people have historically faced discrimination. In addition,
						<a
							href="https://www.air.org/sites/default/files/2022-03/Hidden-Market-Spending-Power-of-People-with-Disabilities-April-2018.pdf"
							>recent research (PDF)</a
						>
						has revealed that there are billions of dollars in potential revenue if
						accessibility needs are accommodated. For example, the keyboard present with
						every desktop and laptop computer, tablet, and smartphone are derived from
						the Hansen Writing Ball, assistive technology invented in the early 1800s.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.content {
	/* font-family: 'Arial', sans-serif; */
	line-height: 1.6;
	color: #333;
	margin: 20px;
}

/* Headings */
.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
	color: #0056b3;
	margin-bottom: 15px;
}

.content h1 {
	font-size: 2em;
}
.content h2 {
	font-size: 1.75em;
}
.content h3 {
	font-size: 1.5em;
}
.content h4 {
	font-size: 1.25em;
}
.content h5 {
	font-size: 1em;
}
.content h6 {
	font-size: 0.875em;
}

/* Paragraphs */
.content p {
	margin-bottom: 20px;
}

/* Block quotes */
.content blockquote {
	border-left: 5px solid #ccc;
	margin: 20px 0;
	padding-left: 15px;
	font-style: italic;
	color: #666;
}

/* Images */
.content img {
	max-width: 100%;
	height: auto;
	display: block;
	margin: 20px auto;
}

/* Links */
.content a {
	color: #007bff;
	text-decoration: none;
	transition:
		color 0.2s,
		text-decoration 0.2s;
}

.content a:hover {
	color: #0056b3;
	text-decoration: underline;
}

/* Lists */
.content ul,
.content ol {
	margin: 20px;
	padding-left: 40px;
}

.content li {
	margin-bottom: 10px;
}

/* Tables */
.content table {
	width: 100%;
	border-collapse: collapse;
	margin: 20px 0;
}

.content th,
.content td {
	border: 1px solid #ddd;
	padding: 10px;
	text-align: left;
}

.content th {
	background-color: #f5f5f5;
}

/* Code blocks */
.content code {
	background-color: #f9f2f4;
	padding: 2px 4px;
	border-radius: 4px;
	font-family: "Courier New", Courier, monospace;
}

.content pre {
	background-color: #f5f5f5;
	padding: 10px;
	border-radius: 4px;
	overflow: auto;
	font-family: "Courier New", Courier, monospace;
}

/* Responsive Design */
@media (max-width: 600px) {
	.content {
		margin: 10px;
	}

	.content h1 {
		font-size: 1.5em;
	}
	.content h2 {
		font-size: 1.25em;
	}
	.content h3 {
		font-size: 1.1em;
	}
}

.shadow-md.shadow-sky{
  box-shadow: 2px 4px 10px rgba(152, 193, 217, 0.25);
  backdrop-filter: blur(10px);
}
</style>
