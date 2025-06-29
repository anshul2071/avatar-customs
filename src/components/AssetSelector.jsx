import { useEffect, useState } from "react";
import api from "../utils/api";
import  useAvatarStore  from "../store/store";
import {Input} from '@/components/ui/input';


export default function AssetSelector ({category}) {
    const [assets, setAssets] = useState([]);
    const setSelection = useAvatarStore(state => state.setSelection);
    const setColor = useAvatarStore(state => state.setColor);

    useEffect(() => {
        api.get(`/assets/${category}`)
         .then(res => setAssets(res.data))
         .catch(console.error);
    }, [category]);


    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">
                {category.charAt(0).toUpperCase()+ category.slice(1)}
            </h3>
            <div className="grid grid-cols-2 gap-2">
                {assets.map(asset => (
                    <img 
                      key={asset._id}
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="cursor-pointer border rounded hover:border-blue-400"
                      onClick={() => setSelection(category, asset)}
                      />
                ))}
            </div>
            {['hair', 'skin', 'eyes', 'lips'].includes(category) && (
                <div className="mt-4">
                    <label className="block mb-1">Color</label>
                    <Input 
                       type="color" 
                       defaultValue = "#ffffff"
                       onChange={(e) => setColor(category, e.target.value)}
                    />
                </div>
            )}
        </div>
    )
}