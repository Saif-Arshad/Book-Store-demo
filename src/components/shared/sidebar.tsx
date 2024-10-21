/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { DualRangeSlider } from '../ui/Dual-Slider'
import useUpdateSearchParams from '@/Hooks/use-update-search'
import SearchInput from './search-input'
import BookSection from '../layout/HomePage/BookSection'


const sortOptions = [
    { name: 'Newest', value: 'newest', current: false },
    { name: 'Price: Low to High', value: 'low-to-high', current: false },
    { name: 'Price: High to Low', value: 'high-to-low', current: false },
]

const filters = [
    {
        id: 'author',
        name: 'Author',
        options: [
            { value: 'jkr', label: 'J.K. Rowling', checked: false },
            { value: 'grrm', label: 'George R.R. Martin', checked: false },
            { value: 'jrrt', label: 'J.R.R. Tolkien', checked: false },
            { value: 'cslewis', label: 'C.S. Lewis', checked: false },
            { value: 'atwood', label: 'Margaret Atwood', checked: false },
            { value: 'hemingway', label: 'Ernest Hemingway', checked: false },
        ],
    },
    {
        id: 'genre',
        name: 'Genre',
        options: [
            { value: 'fiction', label: 'Fiction', checked: false },
            { value: 'fantasy', label: 'Fantasy', checked: false },
        ],
    },

]

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}

export default function Example({ data, meta }: any) {
    const { updateSearchParams } = useUpdateSearchParams();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [yearRange, setYearRange] = useState<number[]>([1950, 2024]);
    const router = useRouter();

    const handleFilterChange = (sectionId: string, value: string, checked: boolean) => {
        const currentParams = new URLSearchParams(window.location.search);

        const existingFilters = currentParams.getAll(sectionId);

        if (checked) {
            currentParams.append(sectionId, value);
        } else {
            const newFilters = existingFilters.filter((filter) => filter !== value);
            currentParams.delete(sectionId);
            newFilters.forEach((filter) => currentParams.append(sectionId, filter));
        }

        router.push(`?${currentParams.toString()}`);
    };

    const handleSortChange = (sortValue: string) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('sort', sortValue);
        router.push(`?${currentParams.toString()}`);
    };

    const handleSliderChange = (newRange: number[]) => {
        setYearRange(newRange);

        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('publicationDate', `${newRange[0]}-${newRange[1]}`); 
        router.push(`?${currentParams.toString()}`);
    };

    return (
        <div className="bg-white">
            <div>
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto  flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white p-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <SearchInput
                                    name="users"
                                    callback={(value) => updateSearchParams("query", value)}
                                />


                                <h4 className="text-sm font-medium text-gray-700 mb-8 ">Publication Year</h4>
                                <DualRangeSlider
                                    label={(value) => value}
                                    value={yearRange}
                                    onValueChange={handleSliderChange}
                                    min={1950}
                                    max={2024}
                                    step={1}
                                />
                                {filters.map((section) => (
                                    <Disclosure
                                        key={section.id}
                                        as="div"
                                        className="border-t border-gray-200 px-4 py-6"
                                        // @ts-ignore
                                        open={openSection === section.id}
                                        onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon aria-hidden="true" className="h-5 w-5" />
                                                            ) : (
                                                                <PlusIcon aria-hidden="true" className="h-5 w-5" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>

                                                <DisclosurePanel>
                                                    <div className="space-y-6">
                                                        {section.id === 'publicationDate' ? (
                                                            <div>

                                                                {/* <div className="flex justify-between text-xs text-gray-500">
                                                                    <span>{yearRange[0]}</span>
                                                                    <span>{yearRange[1]}</span>
                                                                </div> */}
                                                            </div>
                                                        ) : (
                                                            section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        defaultValue={option.value}
                                                                        defaultChecked={option.checked}
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)} // Call handleFilterChange
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}

                                <div
                                    onClick={() => router.push("/")}
                                    className='w-full mt-4 items-center flex  border p-2 hover:bg-black hover:text-white cursor-pointer   justify-center  rounded-lg'>
                                    Clear Filters
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900"> Ink & Imagination</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">


                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <button
                                                    onClick={() => handleSortChange(option.value)}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden lg:block">

                                <SearchInput
                                    name="users"
                                    callback={(value) => updateSearchParams("query", value)}
                                />





                                <h4 className="text-sm font-medium text-gray-700 mb-9">Publication Year</h4>

                                <DualRangeSlider
                                    label={(value) => value}
                                    value={yearRange}
                                    onValueChange={handleSliderChange}
                                    min={1950}
                                    max={2024}
                                    step={1}
                                />
                                {filters.map((section) => (
                                    <Disclosure
                                        key={section.id}
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                        // @ts-ignore
                                        open={openSection === section.id}
                                        onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon aria-hidden="true" className="h-5 w-5" />
                                                            ) : (
                                                                <PlusIcon aria-hidden="true" className="h-5 w-5" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.id === 'publicationDate' ? (
                                                            <div>


                                                                {/* <div className="flex justify-between text-xs text-gray-500">
                                                                    <span>{yearRange[0]}</span>
                                                                    <span>{yearRange[1]}</span>
                                                                </div> */}
                                                            </div>
                                                        ) : (
                                                            section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        defaultValue={option.value}
                                                                        defaultChecked={option.checked}
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)} // Call handleFilterChange
                                                                    />
                                                                    <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}

                                <div
                                    onClick={() => router.push("/")}
                                    className='w-full mt-4 items-center flex  border p-2 hover:bg-black hover:text-white cursor-pointer   justify-center  rounded-lg'>
                                    Clear Filters
                                </div>
                            </form>

                            <div className="lg:col-span-3">
                                {
                                    data.length == 0 ?

                                        "No Book found with  this Filter"
                                        :

                                        <BookSection
                                            data={data}
                                            meta={meta}
                                        />
                                }

                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
