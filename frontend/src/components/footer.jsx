export default function Footer() {
  return (
    <footer className="p-4 flex absolute bottom-0 left-0 items-center p-4 space-x-4 w-full  rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800">
        <span className="text-sm sm:text-center text-gray-400">© 2022 <a href="/" className="hover:underline">Diego Sabino</a>.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm  text-gray-400 sm:mt-0">
            <li>
                <a href="https://github.com/Diego-Sabino" className="mr-4 hover:underline md:mr-6 ">Github</a>
            </li>

            <li>
                <a href="https://github.com/danielwerg/r6api.js#findByUsername" className="hover:underline">R6S Api</a>
            </li>
        </ul>
    </footer>
  )
}