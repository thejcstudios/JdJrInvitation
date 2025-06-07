export default function Navbar() {
  const handleScroll = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 80;
      const yOffset = -navbarHeight;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li onClick={() => handleScroll('rsvp')}>Rsvp</li>
        <li onClick={() => handleScroll('faq')}>Faq</li>
        <li onClick={() => handleScroll('location')}>Location</li>
        <li onClick={() => handleScroll('prenup')}>Prenup</li>
      </ul>
    </div>
  );
}
