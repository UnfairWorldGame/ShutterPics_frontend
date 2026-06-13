import React from 'react';
import { Link } from 'react-router-dom';
import {
	MdCamera,
	MdDesignServices,
	MdVideocam,
	MdMovieEdit,
	MdSupportAgent,
	MdGroups
} from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi2';
import { getInitials } from '../libs/featuredReviews';

const teamData = [
	{
		name: 'Ashish',
		position: 'Lead Photographer',
		about: 'Captures moments with creativity and precision, turning fleeting instants into lifelong memories.',
		icon: MdCamera,
		skills: ['Wedding', 'Candid', 'Portraits'],
		accent: 'from-purple-500 to-violet-600'
	},
	{
		name: 'Priyanshu',
		position: 'Designer',
		about: 'Shapes visual stories with layout, color, and detail so every album feels polished and personal.',
		icon: MdDesignServices,
		skills: ['Album Design', 'Branding', 'Layouts'],
		accent: 'from-blue-500 to-indigo-600'
	},
	{
		name: 'Prakash',
		position: 'Videographer',
		about: 'Crafts cinematic films that preserve emotion, energy, and the full arc of your celebration.',
		icon: MdVideocam,
		skills: ['Cinematic', 'Drone', 'Reels'],
		accent: 'from-pink-500 to-rose-600'
	},
	{
		name: 'Pratik',
		position: 'Photo & Video Editor',
		about: 'Refines every frame with careful color grading and editing until the final delivery shines.',
		icon: MdMovieEdit,
		skills: ['Color Grade', 'Retouch', 'Teasers'],
		accent: 'from-amber-500 to-orange-600'
	},
	{
		name: 'Nikhil',
		position: 'Operations & Support',
		about: 'Keeps shoots running smoothly on the ground so the creative team can focus on what matters.',
		icon: MdSupportAgent,
		skills: ['On-site', 'Coordination', 'Client Care'],
		accent: 'from-teal-500 to-cyan-600'
	}
];

const TeamSection = () => {
	return (
		<section id="team" className="relative border-t border-purple-200/80 py-12 md:py-16">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-purple-400/15 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-blue-400/15 blur-3xl"
			/>

			<div className="relative mx-auto max-w-6xl">
				<div className="mb-10 flex flex-col items-center text-center md:mb-14">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<MdGroups className="text-base" />
						The People Behind the Lens
					</span>
					<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						Meet Our{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							Team
						</span>
					</h2>
					<p className="max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						Skilled professionals working together — from shoot day to final delivery — so your
						story is captured with care.
					</p>
				</div>

				<div className="mb-10 grid grid-cols-3 gap-4 rounded-2xl border border-white/60 bg-white/60 p-4 shadow-lg shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100 sm:p-6">
					<div className="text-center">
						<p className="text-2xl font-bold text-purple-700 sm:text-3xl">5</p>
						<p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
							Creative Experts
						</p>
					</div>
					<div className="text-center">
						<p className="text-2xl font-bold text-purple-700 sm:text-3xl">360°</p>
						<p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
							Full Coverage
						</p>
					</div>
					<div className="text-center">
						<p className="flex items-center justify-center gap-1 text-2xl font-bold text-purple-700 sm:text-3xl">
							<HiSparkles className="text-yellow-500" />
							100%
						</p>
						<p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
							Client Focused
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{teamData.map((member) => {
						const Icon = member.icon;
						return (
							<article
								key={member.name}
								className="group flex flex-col rounded-2xl border border-white/80 bg-white p-6 shadow-lg shadow-purple-900/5 ring-1 ring-purple-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10"
							>
								<div className="mb-5 flex items-start gap-4">
									<div
										className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.accent} text-xl font-bold text-white shadow-lg transition group-hover:scale-105`}
										aria-hidden="true"
									>
										{getInitials(member.name)}
									</div>
									<div className="min-w-0 pt-1">
										<h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
										<p className="text-sm font-semibold text-purple-700">{member.position}</p>
									</div>
									<div className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-700">
										<Icon className="text-lg" />
									</div>
								</div>

								<p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
									{member.about}
								</p>

								<div className="flex flex-wrap gap-2">
									{member.skills.map((skill) => (
										<span
											key={skill}
											className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-100"
										>
											{skill}
										</span>
									))}
								</div>
							</article>
						);
					})}
				</div>

				<div className="mt-12 rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-600 to-violet-700 p-6 text-center text-white shadow-xl shadow-purple-900/20 sm:p-8 md:flex md:items-center md:justify-between md:text-left">
					<div className="md:max-w-xl">
						<h3 className="text-xl font-bold sm:text-2xl">Ready to work with our team?</h3>
						<p className="mt-2 text-sm text-purple-100 sm:text-base">
							Book a date and let our crew handle photography, video, and editing for your next
							event.
						</p>
					</div>
					<Link
						to="/shutterpics-online-booking"
						className="mt-5 inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-800 transition hover:bg-purple-50 md:mt-0"
					>
						Book Your Date
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
