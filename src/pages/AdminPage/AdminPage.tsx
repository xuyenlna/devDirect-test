import Button from '~/components/Button'
import LeftComponent from './partials/LeftComponent'
import RightComponent from './partials/RightComponent'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const navigate = useNavigate()
  const handleNavigate = () => navigate('/customer')
  return (
    <div className='w-screen  px-4'>
      <div className='h-[80px] w-full flex justify-center items-center mb-4 border-b border-[#c3cad1]'>
        <Button type='primary' onClick={handleNavigate}>
          Views
        </Button>
      </div>
      <div className='h-[500px] w-full flex justify-start gap-4 '>
        <LeftComponent />

        <RightComponent />
      </div>
    </div>
  )
}
