import React from 'react'

const Placeholder = () => {
    return (
        <div class="loader relative h-screen border border-gray-300 bg-gray-200 overflow-hidden">
            <div class="wrapper relative w-full h-full">
                {/* <div class="line-1 absolute h-6 w-full bg-gray-400 animate-pulse"></div> */}
                <div class="line-1 absolute h-8 w-full bg-gray-400 animate-pulse flex items-center justify-between">
                    <div class="fixed w-full top-0 left-0 flex bg-transparent sm:px-20 py-1 justify-center lg:justify-between z-50">
                        <div class="hidden md:flex justify-center items-center gap-5 text-light animate-pulse">
                            <span class="font-semibold bg-gray-300 w-16 h-6 rounded-md"></span>
                            <div class="flex gap-3">
                                <div class="bg-gray-300 w-6 h-6 rounded-full"></div>
                                <div class="bg-gray-300 w-6 h-6 rounded-full"></div>
                                <div class="bg-gray-300 w-6 h-6 rounded-full"></div>
                                <div class="bg-gray-300 w-6 h-6 rounded-full"></div>
                            </div>
                        </div>

                        <div class="flex gap-5 text-light animate-pulse">
                            <div class="bg-gray-300 w-28 h-6 rounded-md"></div>

                            <div class="flex gap-5">
                                <div class="bg-gray-300 w-20 h-6 rounded-md"></div>
                                <div class="bg-gray-300 w-20 h-6 rounded-md"></div>
                                <div class="bg-gray-300 w-24 h-6 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line-2 absolute h-10 w-full bg-gray-400 mt-10 animate-pulse">
                    <nav class="fixed top-3 left-0 mt-5 h-16 w-full border px-2 lg:px-20 bg-gray-500 flex items-center justify-between z-50">
                        <div class="logo flex justify-center items-center animate-pulse">
                            <div class="bg-gray-300 w-32 h-8 rounded-md"></div>
                        </div>

                        <div class="hidden md:block navItems animate-pulse">
                            <ul class="flex items-center gap-6">
                                <li class="bg-gray-300 w-24 h-6 rounded-md"></li>
                                <li class="bg-gray-300 w-24 h-6 rounded-md"></li>
                                <li class="bg-gray-300 w-24 h-6 rounded-md"></li>
                                <li class="bg-gray-300 w-24 h-6 rounded-md"></li>
                            </ul>
                        </div>

                        <div class="hidden md:flex items-center justify-center animate-pulse gap-2">
                            <div class="bg-gray-300 w-6 h-6 rounded-full"></div>
                            <div>
                                <form>
                                    <div class="bg-gray-300 w-32 h-6 rounded-md mt-1"></div>
                                </form>
                            </div>
                        </div>

                        <div class="md:hidden animate-pulse">
                            <div class="bg-gray-300 w-8 h-8 rounded-md"></div>
                        </div>
                    </nav>

                </div>
                <div class="line-4 absolute top-24 left-8 h-[80%] w-[95%] animate-pulse">
                    <div class="bg-hero p-5 flex relative overflow-hidden w-full h-full">
                        <div class="background-placeholder bg-gray-400 w-full h-full rounded-md flex items-center justify-center flex-col">

                            <div class=" w-full">
                                <div class="bg-gray-300 h-10 w-72 mx-auto rounded-md"></div>
                            </div>

                            <div class=" w-full flex items-center justify-center mt-5">
                                <div class="bg-gray-300 h-12 w-44 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Placeholder
