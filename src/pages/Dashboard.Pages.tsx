import {Button} from '@/components/ui/button'
import { useHealthCheck } from '@/hooks/UseHealthCheck.Hooks'


export default function Dashboard(){
    const { checkHealth } = useHealthCheck();

    return(
         <div className="flex flex-col items-center justify-center h-screen">
    <Button variant = "destructive" className="mb-4" onClick={checkHealth}>
        Check Health
        </Button>
        </div>
    );
   
}
