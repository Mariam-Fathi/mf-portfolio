import { logoIconsList} from "../constants";

const LogoIcon = ({ icon }) => {
    return (
        <div className="flex-none flex-center marquee-item">
            <img src={icon.imgPath} alt={icon.name} className={'w-24 h-24'}/>
        </div>
    );
};

const LogoShowcase = () => (
    <div id={'skills'} className=" mt-12 relative">
        <div className="gradient-edge" />
        <div className="gradient-edge" />

        <div className="marquee h-52">
            <div className="marquee-box md:gap-12 gap-5">
                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={index} icon={icon} />
                ))}

                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={index} icon={icon} />
                ))}
            </div>
        </div>
    </div>
);

export default LogoShowcase;
