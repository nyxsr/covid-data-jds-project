function Footer({text}: {text: React.ReactNode}) {
  return (
    <footer className="bg-[#1c1c1c] text-white text-sm md:text-base w-full h-[5rem] flex items-center justify-center">
      {text}
    </footer>
  )
}

export default Footer
