
import React, { useEffect, useRef } from "react";
import "../assets/styles/ImageGallery.css";


const ImageGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = wrapper.getBoundingClientRect();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const ratioX = mouseX / bounds.width;
      const ratioY = mouseY / bounds.height;

      const moveX = ratioX * (container.offsetWidth - bounds.width + 100) * -1;
      const moveY = ratioY * (container.offsetHeight - bounds.height + 100) * -1;

      container.animate(
        {
          transform: `translate(${moveX}px, ${moveY}px)`,
        },
        {
          duration: 3000,
          fill: "forwards",
          easing: "ease",
        }
      );
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    return () => wrapper.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const images = [
    "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/491863060_1120575126749222_7230523752670266678_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=t16_eticMXMQ7kNvwFmrmN8&_nc_oc=Adl-W1CxB71oqTJlwxDGSvfkCCfh3j2OQH1V5JrdIeNsUxy2hN55d5tIzfMbEiph9DhgWLSvBdvoE7h2bXbWkS2t&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=m9dnM2lQu1zsuSwT60f0Wg&oh=00_AfONkIrNfhO8nOGactQe8kf4ixmNXD599fP6l8AANbkIQw&oe=684A10E6",
    "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/492421437_1120575010082567_3147380520881727709_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EuBKLNw3feoQ7kNvwHGqErg&_nc_oc=Adl79r6AH7eeIfAE7j2OzqCjUIqJbS3K-PP-V3mCm0WVQHmMwBvTUkQNFUaP7GpCFy6DCL1_zdfAEsbshQ-NPTPj&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=LPNolD6NjnadIvHL1YTbeg&oh=00_AfOGhjlpeSS8SRbtu1RizSQ3G9X_IXZ2O1ZjnzqREXPs2g&oe=684A1677",
    "https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/490740038_1120575006749234_7329793207791060419_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pczoVFGvO_sQ7kNvwF3rPhm&_nc_oc=AdmW-psCp1rk1CJQptZYvOVwjrM3sxm01M7tnQ7vBEAmNZyWcSOeAcohMTpQEwoI7xwGMoLIm51Ss-6YUaukK3yG&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=9jvpccBZB2U-r3W0-73mug&oh=00_AfMOh1fMJHYMW3V9Ts0nBKIgNl2DXbcT9DS8hScVRK0kgQ&oe=684A0F3E",
    "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/492489841_1120574670082601_8816973400812049291_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_Jyh7yxMvPoQ7kNvwEag8gu&_nc_oc=Adkpxk_dCWbVfqTodinVN-Dlij0Yt_WhNdYMfPgLmz_XMJGj3YsdWASqBErZSj0OjsElW9NUN-wg71a1eQRZlNIa&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=70c7EBZAAAm4d2q4n2ZwXw&oh=00_AfNiw37-iu7KxzhdJHUe9SIl9jo9UhvOd5piwfX8mTfAhg&oe=684A10A3",
    "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/490545842_1120574570082611_5470082747296572828_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=sFKhv1e4J5UQ7kNvwFvt1j4&_nc_oc=Adn9flZE0UvTbgjXd0gAk1KodM8qAdLDUCX5QDUF5lOGWYFsArp-V4d1nMRKSIwIl1d-CXo5zn_qu1PPqd4a04O6&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=vyc-Gvsw86kq9Q7tmEBCgg&oh=00_AfPc6yOPSz1bmWUbYfFgzlUD_Jx-A0gz0HOliHeIiC-D-Q&oe=684A04C6",
    "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/492121212_1120574420082626_3937113116028771919_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=biee_3tWaRYQ7kNvwH-W6px&_nc_oc=Adn4BtZ-PVXSkGeSFsmHVcXdO2GeHD4WyMgJJYF2d56JYNn4cYl3isc0wSBoVzF31ELOt5KVbeO7Yias4nWkh5_h&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=XwkaoXsaZuUU5LfOLSsu-A&oh=00_AfPJRqmYhKDxxXjHthei7cZPcJLYUuyJX7dOPsb_klC1mA&oe=684A022E",
    "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/492457575_1120574106749324_4403085928393359850_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=CxK0fJd--wQQ7kNvwHhQDt2&_nc_oc=AdkbUmlAcqoQXO61EhcAtL-mIdniIZuw4X3wAFsccFvaH9uAHASfihcVo35UlUul_XvAAhP5_lcB75INvXVjSGxy&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=A6Pm9T4z7624Q28ERfMy_A&oh=00_AfNy02QLJA6TnkvkaZEspnp0WkEn5x7pDM0ZYoPJB2HAHQ&oe=684A1384",
    "https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/491702024_1120573676749367_1495728979237414869_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8RR6IOwrlnkQ7kNvwFrN_8P&_nc_oc=AdkJ1v712vmKaBhqJtiwZn91Tn_Oxky56m_Vz23MPY10tC22zxI9ZsSUWPUYlUTRN471AqQD0-VtgSaN7xOtN-Vq&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=D2b2tV1VAnZPlNxcw_n92A&oh=00_AfNOFL9dI_b20FI8c-tcJ7kATPHyD1_dZ7EY_MY-XbmOTg&oe=684A1937",
    "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/492211019_1120573166749418_3956894625445467956_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qATXEfZEAkwQ7kNvwGDDRDI&_nc_oc=AdkVtn5CKUxVqgwMgahx9YYYeEj2hyRc8dzhB5UE3w5dPEhB6yF2ydND1VQJwG3Jx3gCnseD0ZXNHS9Prb5XTWqc&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=-RK1NuIHxnWJj6EXmSNJBQ&oh=00_AfNLS7JM9yUHZcPuM-nDrJBJuMqZGz1lHUcsY6I0nIoICw&oe=684A0C4A",
    "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/492201206_1120574323415969_8377047387859636306_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MfHbcOdVAYgQ7kNvwG51Z4l&_nc_oc=Adm42wJ9TXkVfWWfOiEd4tktCjzQIjNFDoXK7I6kqMkWxm2UwGUSha9uucfrHxw59ddpZSfnRaCsNJ6GrOqyJ6d3&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=JVIMNgSpiRx-ZGkkDImRVQ&oh=00_AfPTKwCxLH-CAKZnCvYTpTR7C1fo0Da7mJvqQY-JwjgxBQ&oe=684A12B3",
    "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/492079316_1120572550082813_7978129707786159962_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=OsHBuyVPa-kQ7kNvwGAs4xR&_nc_oc=AdluK8UpvqN5CrKMEGSYMzgwvADOQU3jRYeel2IwZSmedrCmw9NO2QhaWlmPh49TlzaJhX27hhhkvUSd_ISnmZ3m&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=OGVnHC8McEZnL21ZaRQqXA&oh=00_AfPAT5_nT0SNw7u1Rr00bokbZ4LbtntNeHKc1hdLm1PWsg&oe=684A0BCC",
    "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/491691274_1120572653416136_607592814906709750_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=wb5KBQ5VNzkQ7kNvwEXdrQv&_nc_oc=Adlm37vhvfitlBQDX1KZavExwXGGGu90jZModIC0HK6n6oPZfeWRL4VSk3gjT9hjcyp0lLCcOPbGpMDzctKDo8jp&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=R8bH2r7xw3C0KhEz54IJgQ&oh=00_AfOvFVSFfOZru0Mr9f7AsC-2LGXrC0WgJ1vP5bVhVVNEEg&oe=684A1A17",
    "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/490732539_1120573570082711_2580503099313655855_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BJWfYS1AUqoQ7kNvwGbsHO3&_nc_oc=AdnoagnUUg-wMC3P6NQGLhpacwA_o14Qwl3r512v1WnAAEA1m-u5yTPV-Sxa90O6piBLLChNKeq1KKxuGOazdVJb&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=U_AQtW8vEP_asGNY-RfuhQ&oh=00_AfNjb02ZMQX2VeFjpL4TwHvT4KEYr5SiIp1PH9UzMTFDLg&oe=684A169E",
    "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/492393737_1120574223415979_4320098677159625134_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hfv1SSxILK0Q7kNvwEIGPM3&_nc_oc=AdkxSBs8JjXzU2_fGCEg_Fg9-f8KCywJBnsxF7bdZ6bH0gAxyl4np6cvDE102jueJRcq6USSLjyzPWtxMzTgLRGU&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=zNIIYfT1LCw9OZ_OPdLf_w&oh=00_AfPSpbBRk8zT4Qxn5_qcWoJsL8qN4SPTttuFiwE8whQlRQ&oe=684A1191",
    "https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/491760726_1120574546749280_224422196406207617_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ThUrh5ERjGwQ7kNvwEiGK8S&_nc_oc=AdmiW-mS0noOTLJU1Me6X5dM4QPMAgGB3uxIYOo4csj1PS4FDygdeby8sF9b2UCpXbeaf3XdWqlByjGJpwMUFdOM&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=HwFkPP4X0WSl-WDda2htUw&oh=00_AfPZVclNa4liyo9C4y6AWEO189rOMgZx-DuU6CAJx4UA9g&oe=6849FF74",
  ];

  return (
    <>
    <div className="prenup">
    <h3>More Prenup Photos</h3></div>
    <section className="gallery-wrapper" ref={wrapperRef}>
      <div id="container" ref={containerRef}>
        {images.map((src, idx) => (
          <div key={idx} className="tile">
            <img src={src} alt={`Image ${idx + 1}`} />
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default ImageGallery;

