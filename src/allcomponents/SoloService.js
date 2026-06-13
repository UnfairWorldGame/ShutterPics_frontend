import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBookmarkStar } from 'react-icons/bs';
import { MdFlipToBack, MdCheckCircle, MdPayment } from 'react-icons/md';
import { HiOutlinePhotograph } from 'react-icons/hi';

const getPackagePrice = (subh3) => {
	const match = subh3?.match(/Total Amount\s+([\d,]+)/i);
	return match ? match[1] : null;
};

const ServiceList = ({ title, items, icon: Icon }) => (
	<div className="rounded-xl border border-purple-100 bg-white/80 p-3 sm:p-4">
		<h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-purple-900 sm:text-base">
			{Icon && <Icon className="shrink-0 text-purple-600" />}
			{title}
		</h3>
		<ul className="space-y-1.5">
			{items.map((item, i) => (
				<li key={i} className="flex gap-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
					<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
					<span>{item}</span>
				</li>
			))}
		</ul>
	</div>
);

const SoloService = ({ service, idx }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const navigate = useNavigate();
	const price = getPackagePrice(service.subh3);

	const handleBook = (e) => {
		e.stopPropagation();
		navigate('/shutterpics-online-booking', { state: { eventIdx: idx } });
	};

	return (
		<div className="group h-[26rem] perspective-1000 sm:h-[28rem]">
			<div
				className={`relative h-full w-full preserve-3d transition-transform duration-500 ease-in-out ${
					isFlipped ? 'rotate-y-180' : ''
				}`}
			>
				{/* Front */}
				<button
					type="button"
					onClick={() => setIsFlipped(true)}
					className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl text-left shadow-xl shadow-purple-900/15 ring-1 ring-white/20 backface-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
				>
					<img
						src={service.imgLink}
						alt={service.heading}
						className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-900/40 to-transparent" />

					{price && (
						<span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-purple-800 shadow-md backdrop-blur-sm">
							₹{price}
						</span>
					)}

					<div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-purple-200">
							{service.subh1}
						</p>
						<h2 className="mb-4 text-xl font-bold leading-snug text-white sm:text-2xl">
							{service.heading}
						</h2>
						<span className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-purple-800 shadow-md backdrop-blur-sm transition group-hover:bg-white">
							View details
							<MdFlipToBack className="text-base" />
						</span>
					</div>
				</button>

				{/* Back */}
				<div className="absolute inset-0 h-full w-full rotate-y-180 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl backface-hidden">
					<div className="flex h-full flex-col">
						<div className="flex items-start justify-between gap-3 border-b border-purple-100 bg-white/70 px-4 py-3 sm:px-5">
							<div className="min-w-0">
								<h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
									{service.heading}
								</h2>
								<p className="text-xs font-medium text-purple-700 sm:text-sm">{service.subh1}</p>
							</div>
							{price && (
								<span className="shrink-0 rounded-lg bg-purple-600 px-2.5 py-1 text-sm font-bold text-white">
									₹{price}
								</span>
							)}
						</div>

						<div className="flex-1 space-y-3 overflow-y-auto p-3 nobar sm:p-4">
							{service.subh4 && (
								<ServiceList
									title={`${service.subh4} ${service.subh5 || ''}`}
									items={service.list1}
									icon={HiOutlinePhotograph}
								/>
							)}

							{!service.subh4 && (
								<ServiceList
									title="What's Included"
									items={service.list1}
									icon={HiOutlinePhotograph}
								/>
							)}

							{idx === 3 && service.list4 && (
								<ServiceList
									title={service.subh6}
									items={service.list4}
									icon={HiOutlinePhotograph}
								/>
							)}

							<ServiceList
								title={service.subh2}
								items={service.list2}
								icon={MdCheckCircle}
							/>

							<ServiceList
								title="Payment Plan"
								items={service.list3}
								icon={MdPayment}
							/>
						</div>

						<div className="flex gap-2 border-t border-purple-100 bg-white/80 p-3 sm:p-4">
							<button
								type="button"
								onClick={() => setIsFlipped(false)}
								className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
							>
								Back
							</button>
							<button
								type="button"
								onClick={handleBook}
								className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-500/25 transition hover:bg-purple-700"
							>
								Book Now
								<BsBookmarkStar />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SoloService;
