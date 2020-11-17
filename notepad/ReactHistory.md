### Mixin
function myMixin(){
    //生命周期
    didMount : function(){

    }
    //自定义函数
    doSomthing : function*({

    })

}
React.createComponent({
    mixin : [
        myMixin
    ]

    //this.doSomthing();
})


### HOC
const component = hoc(view)

const withRequest = (api, view) => {

    return component () => {

        api.get();

        render : function(){
            <view/>
        }
    };
}


### Render Props
//Demo1
<DataProvider render={ data => {
    <h1>xxx</h1>
} }/>

//Demo2
<DataProvider>
{ data => {
    <h1>xxx</h1>
} }
</DataProvider>

//Demo3
<DataProvider>
{ data => {
    <Data1Provider>
    { data1 => {
        <Data3Provider>
        { data2 => {
            <h1>xxx</h1>
        } }
        </DataProvider>
    } }
    </Data1Provider>
} }
</DataProvider>

//Demo4
component logic{
    //逻辑部分
    render{
        return this.props.children({
    
        })
    }
}
logic(<view1>)
logic(<view2>)


### Hooks
React 16.8  AlgebraicEffect

//hooks
function useCounter(){

    cosnt [count,setCount]useState()

    const increment = ()=>{
        setCount(count+1)
    }

     const decrement = ()=>{
        setCount(count-1)
    }

    return [
        count,
        increment,
        decrement,
    ]

}

functoin counter(){
    //逻辑
    const [count,increment,decrement] = useCounter();
    //视图
    return <View 
            count={count}
            increment={increment}
            decrement={decrement}
        />
    
}
