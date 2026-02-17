import { Helmet } from "react-helmet-async";

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Milo R. Jørgensen",
    url: "https://mappso.com",
    image: "https://mappso.com/assets/profile.jpeg",
    jobTitle: "Full-Stack Developer & Founder",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Aarhus",
        addressCountry: "DK",
    },
    sameAs: [
        "https://github.com/tomilodk",
        "https://www.linkedin.com/in/milorj/",
        "https://blog.mappso.com",
    ],
    knowsAbout: [
        "React",
        "TypeScript",
        ".NET",
        "Node.js",
        "Cloud Infrastructure",
        "Docker",
        "Full-Stack Development",
    ],
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "mappso",
    url: "https://mappso.com",
    author: {
        "@type": "Person",
        name: "Milo R. Jørgensen",
    },
};

const StructuredData: React.FC = () => (
    <Helmet>
        <script type="application/ld+json">
            {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
        </script>
    </Helmet>
);

export default StructuredData;
