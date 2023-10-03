import AvatarUser from "./avatar";
import { CarbonDocument, CarbonEmail, CarbonFolder, CarbonImageCopy, CarbonUserMultiple, IcOutlineArticle, IcOutlineFolder, IcOutlineSwitchAccount } from "./icon";
import Routes from "./routes";

export default function Navbar(){
    return(
        <nav className="w-full border border-r-gray-200 h-[100vh] px-3">
            <div>
                <AvatarUser />
            </div>
            <div>
                <Routes icone={<CarbonDocument className = "w-6 h-6" />} url={'/articles'}> Articles </Routes>
                <Routes icone={<CarbonFolder className = "w-6 h-6" />} url={'/ressources'}> Ressources </Routes>
                <Routes icone={<CarbonUserMultiple className = "w-6 h-6" />} url={'/utilisateurs'}> Utilisateurs </Routes>
                <Routes icone={<CarbonEmail className = "w-6 h-6" />} url={'/mails'}> E-mails </Routes>
                <Routes icone={<CarbonEmail className = "w-6 h-6" />} url={'/contact-us'}> Contact-us Message </Routes>
                <Routes icone={<CarbonImageCopy className = "w-6 h-6" />} url={'/images'}> Images </Routes>
            </div>
        </nav>
    )
}