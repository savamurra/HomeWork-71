
const Home = () => {
    const styles = {
        background: "url(https://i.pinimg.com/736x/50/97/ab/5097ab52bc68a49e5d006d0c55a5fed1.jpg) no-repeat",
        backgroundSize: "cover",
        height: 700,
        width: 1200,
        color: "white",
        padding: 40,
        textAlign: "center" as const,
    };

    return (
        <div style={styles}>
            <h1>Добро пожаловать на страницу Администратора</h1>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, fontSize: 18}}>
                <b>Для просмотра и редактирования блюд нажмите кнопку Dishes</b>
                <b>Для просмотра заказов нажмите кнопку Orders</b>
            </div>
        </div>
    );
};

export default Home;