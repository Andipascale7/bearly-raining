function Footer() {
  return (
    <footer className="text-center mt-12 pb-8">
      <p className="text-white text-sm opacity-75">
        Weather data from{' '}
        <a 
          href="https://open-meteo.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:opacity-100"
        >
          Open-Meteo
        </a>
      </p>
    </footer>
  );
}

export default Footer;