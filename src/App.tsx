
import './App.css'
import ListRoom from './components/ListRoom'
import React from 'react'
import RoomDetail from './components/RoomDetail'
function App() {
  const [data, setData] = React.useState<Room[]>([] as Room[])
  const [loading, isLoading] = React.useState<boolean>(true)
  const [viewing, setViewing] = React.useState<number>(0)
  const [currentRoom, setCurrentRoom] = React.useState<Room | null>(null)
  const [inputValue, setInputValue] = React.useState<{ [key: number]: string }>({});
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("./data.json")
        if (!response.ok) throw new Error("Lỗi API")
        const jsonData = await response.json()
        isLoading(!loading)
        setData(jsonData.rooms)
      } catch (error) {
        console.log(error);
      }
    }
    loadData()
  }, [])
  const handleCLick = (id: number) => {
    setViewing(id)
  }
  const handleInput = (roomid: number, value: string) => {
    setInputValue((prev) => ({ ...prev, [roomid]: value }));
  }
  React.useEffect(() => {
    setCurrentRoom(data.filter(room => room.id == viewing)[0])
  }, [viewing])

  if (loading) return <p>Chờ tý, xử lý không hay nên load hơi chậm...</p>
  return (
    <div className='container mb:max-w-none bg-[#2E2E2E] rounded-xl flex h-max min-h-[100vh] px-6'>
      <ListRoom rooms={data} handleCLick={handleCLick} inputs={inputValue} viewing={viewing} />
      {currentRoom && <RoomDetail key={currentRoom.id} room={currentRoom}
        inputValue={inputValue[currentRoom.id]}
        setInputValue={handleInput} />}
    </div>
  )
}

export default App
