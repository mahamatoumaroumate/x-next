import Feed from '@/components/Feed'
import Input from '@/components/Input'

const HomePage = () => {
  return (
    <div className='mx-auto border-r border-l min-h-screen '>
      <div className='py-2 px-3 sticky top-0  bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <Input />
        <Feed />
      </div>
    </div>
  )
}
export default HomePage
