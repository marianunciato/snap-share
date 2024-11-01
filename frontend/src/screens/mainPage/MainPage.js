import '../../App.css';
import Header from '../../components/header/Header';

const MainPage = () => {
    return (
        <div className="flex flex-col bg-slate-50 h-screen w-full">
            <Header text="Adicionar novo ensaio" showGoBack={false} showPageTitle={false}/>
            <div div className="flex justify-center items-center flex-col mt-24">
                <div className="">
                    
                </div>
            </div>            
        </div>
    );
}

export default MainPage;