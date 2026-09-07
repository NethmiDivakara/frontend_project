import {Button} from '@/components/ui/button'
import { useHealthCheck } from '@/hooks/UseHealthCheck.Hooks'


export default function Dashboard(){
    const { checkHealth } = useHealthCheck();

    return(
        
        <div className=" flex min-h-full flex-1 flex-col items-center justify-center">
           <Button variant = "destructive" className="mb-4" onClick={checkHealth}>
           Auth me
           </Button>
        </div>
    );
   
}
