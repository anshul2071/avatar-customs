import  {useState} from 'react';
import {Toaster} from './components/ui/sonner'
import { Button } from './components/ui/button';
import AvatarScene from './components/AvatarScene';
import AssetSelector from './components/AssetSelector';
import ThemeToggle from './components/ThemeToggle';
import exportGLTF from './utils/exportGLTF';
import { toast } from 'sonner';



const App = () => {
    const categories = [
        'hair','skin','eyes','nose','lips',
        'tops', 'bottoms','shoes', 'glasses', 'hats'
    ];


    const [activeCategory, setActiveCategory] = useState('hair');
    const [exporting, setExporting] = useState(false);


    const handleDownload = async () => {
        setExporting(true);
        try {
            const scene = window.__R3F__?.scene;
            if(!scene) {
                throw new Error('Scene not found');
            }

            const blob = await exportGLTF(scene);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'avatar.gltf';
            a.click();
            toast({ title: 'Download started', description: 'Your avatar is being downloaded.' });
        }
        catch (error) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }

        setExporting(false);
    };


    return (
        <div className='flex-h-screen'>
            <aside className='w-64 p-4 bg-gray-100 dark:bg-gray-800'>
                <h2 className='text-xl font-bold mb-4'>Avatar Customization</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category} className='mb-2'>
                            <Button
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className='w-full'
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                        </li>
                    ))}
                </ul>
                </aside>
                 <main className="flex-1 flex flex-col">
                    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
                        <ThemeToggle />
                        </header>
                        <div className="flex flex-1">
                            <section className="w-64 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                                <AssetSelector category={activeCategory} />
                             </section>
                             <section className="flex-1 relative bg-white dark:bg-gray-900">
                                <AvatarScene />
                                <div className="absolute bottom-4 right-4">
                                    <Button onClick={handleDownload} disabled={exporting}>
                                        {exporting ? 'Exporting…' : 'Download Avatar'}
                                        </Button>
                                        </div>
                                    </section>
                                </div>
                            </main>
                             <Toaster />
                        </div>
    )
}


export default App