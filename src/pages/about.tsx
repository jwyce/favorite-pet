const AboutPage = () => {
	return (
		<div className="flex flex-col items-center text-xl">
			<h2 className="text-2xl font-bold p-4">About</h2>
			<p className="max-w-xl text-center">
				I made this to experiment and familiarize myself with the tradeoffs of
				using trpc, vercel lambda, prisma and planetscale over a more
				traditional postgresql and graphql api
			</p>
			<div className="p-4" />
			<ul>
				<li>
					{'- '}
					<a className="text-blue-200 underline" href="https://roundest.t3.gg/">
						Original app by Theo which heavily inspired this 💜
					</a>
				</li>
				<li>
					{'- '}
					<a
						className="text-blue-200 underline"
						href="https://github.com/jwyce/favorite-pet"
					>
						Public Github repo
					</a>
				</li>
			</ul>
		</div>
	);
};

export default AboutPage;
