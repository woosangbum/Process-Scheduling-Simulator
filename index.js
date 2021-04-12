//-------------------태그 관리-------------------------
const inputTable = document.querySelector("#input-table");
const showTable = document.querySelector("#show-table");
const body = document.querySelector("body");
//------------------태그 관리 끝-----------------------



//------------------전역변수 선언---------------------
let numberOfProcess;  // 총 프로세스 수
let numberOfprocessor;  // 프로세서 수
let processData = new Array(); /* 각 프로세스 별 정보:프로세스번호, 도착시간, 
실행시간, 시작시간, 종료시간, 대기시간}*/
let quantumTime; // 퀀텀 타임
let processorRunningCheck = new Array; // 프로세서 별 실행중인지 아닌지 확인하기 위한 변수
//-----------------전역변수 선언 끝--------------------

class Queue {
    constructor(){ // 생성자
        this.dataStore = []; 
    }

    //큐의 끝부분에 요소를 추가
    enqueue(element) {
        this.dataStore.push(element);
    }

    //큐의 앞부분에서 요소를 삭제
    dequeue() {
        return this.dataStore.shift();
    }

    //큐의 앞부분에 저장된 요소 확인
    front() {
        return this.dataStore[0];
    }

    //큐의 끝부분에 저장된 요소 확인
    back() {
        return this.dataStore[this.dataStore.length-1];
    }

    //큐의 모든 요소를 출력
    toString() {
        var retStr = "";
        for (var i = 0;i < this.dataStore.length; ++i )    {
            retStr += this.dataStore[i] + "\n";
        }
        return retStr;
    }

    //큐가 비어있는지 여부 확인
    empty() {
        if (this.dataStore.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}

//------------------입력 데이터 처리-------------------
function addInputRow(){
    if(inputTable.rows.length < 15){
        let newRow = inputTable.insertRow(inputTable.rows.length);  
        let size = inputTable.rows.length;

        const cell0 = newRow.insertCell(0);
        cell0.innerText = "P" + size;

        //arrival time
        const arrival = newRow.insertCell(1);
        let arrivalText = document.createElement("input");
        arrivalText.setAttribute("value", "");
        arrival.appendChild(arrivalText);

        arrivalText.type="text";
        arrivalText.className = "arrivalTime";

        //burst time
        const burst = newRow.insertCell(2);
        let burstText = document.createElement("input");
        burstText.setAttribute("value", "");
        burst.appendChild(burstText);

        burstText.type="text";
        burstText.className = "burstTime";
    }
}

function deleteLastIndexOfInputRow(){
    // const table = document.querySelector("table");
    if(inputTable.rows.length >= 1){
        inputTable.deleteRow(-1);
        showTable.deleteRow(-1);
    }
}
//------------------입력 데이터 처리 끝-----------------



//------------------BackEnd-------------------------
// 알고리즘 선택 함수
function chooseProcessAlgorithm(){
    const selectprocess = document.querySelector(".selectprocess");
    const processValue = selectprocess.value;
    console.log("Selected Algorithm: ",processValue);
    if(processValue == "fcfs"){
        fcfs();
    }
    // else if(processValue == "rr"){
    //     rr();
    // }
    // else if(processValue == "spn"){
    //     spn();
    // }
    // else if(processValue == "sptn"){
    //     sptn();
    // }
    // else if(processValue == "hrrn"){
    //     hrrn();
    // }
    // else if(processValue == "newalgorithm"){
    //     newalgorithm();
    // }
}

function fcfs(){ //
    const readyQueue = new Queue();
    let proccsorRunningQueue = new Array(); // 프로세서 실행 큐
    readyQueue.enqueue("P1");
    console.log(readyQueue.toString())
    readyQueue.enqueue(1);
    console.log(readyQueue.toString())
    readyQueue.dequeue();
    console.log(readyQueue.toString())

}
function rr(){
    
}
function spn(){
    
}
function sptn(){
    
}
function hrrn(){
    
}
function newalgorithm(){
    
}
//------------------BackEnd-------------------------



// --------------------- FrontEnd -------------------
function createShowTable(){
    deleteAllOfShowTable();
    for(let i=0; i <inputTable.rows.length; i++){
        var getRow = showTable.insertRow(showTable.rows.length);
        const row0 = getRow.insertCell(0);
        row0.innerText = processData[i][0];
        const row1 = getRow.insertCell(1);
        row1.innerText = processData[i][1];
        const row2 = getRow.insertCell(2);
        row2.innerText = processData[i][2];
    }
}

function deleteAllOfShowTable(){
    while(showTable.rows.length>0){
        showTable.deleteRow(0);
    }
}

function createProgressBar(){
    deleteAllOfProgressBar();
    for(let i=0; i < numberOfprocessor; i++){
        var childProg = document.createElement("div");
        childProg.className = "progressBar";
        childProg.id ="progressBar";
        progressBars.appendChild(childProg);
    }
}

function showProgressBar(){
    //20초를 100%로 잡고 시작 
    //1초당 5%씩 올라감
    const progress = document.querySelectorAll(".progressBar");
    for(let i=0; i<numberOfprocessor; i++){
        var width = 0;
        var max = 100;
        var id = setInterval(frame, 500);
        var second = 1;
        function frame(){
            if(width >= max){
                clearInterval(id);
            }
            else{
                width += 5;
                progress[i].style.width = width+"%";
                progress[i].innerHTML = second++;
            }
        }
    }
}

function deleteAllOfProgressBar(){
    var del = document.getElementById("progressBars"); 
    while ( del.hasChildNodes() ) { 
        del.removeChild( del.firstChild ); 
    }
}
//-------------------- FrontEnd 끝--------------------




//-------------------- 실행시 처리 ---------------------
function run(){
    //입력값 정리
    const ar = document.querySelectorAll(".arrivalTime");
    const br = document.querySelectorAll(".burstTime");
    numberOfProcess = inputTable.rows.length;
    numberOfprocessor = document.querySelector(".numofprocessors").value;
    quantumTime = document.querySelector(".quantumTime").value;

    for(let i =0; i<numberOfprocessor; i++){
        processorRunningCheck[i] = -1;  // 프로세서 수 만큼 프로세서를 꺼진상태(-1)으로 초기화
    }
    
    //프로세스 정보를 넣을 2차원 배열 생성하기
    for(let i = 0; i<inputTable.rows.length; i++){
        processData[i] = new Array(6);
    }
    
    //프로세스번호, 도착시간(index = 1), 실행 시간(index = 2) 저장 배열
    for(let i=0; i <inputTable.rows.length; i++){
        processData[i][0] = "P"+(i+1);
        processData[i][1] = ar[i].value;
        processData[i][2] = br[i].value;
    }

    //변수값 확인
    console.log("numberOfProcess: ",numberOfprocessor);
    console.log("numberOfProcess: ",numberOfProcess);
    console.log("Run-processData:",processData);
    console.log("quantumTime: ",quantumTime);
    console.log("Processor State: ",processorRunningCheck);
    
    // 표 만들기 : 이름, Arrival Time, Buster Time, Wating Time, Turnaound Time, Nomarlized TT
    createShowTable();

    //progress bar 함수 -> 큰 창과 그 내부 프로세스들의 상태바 만들기 위한 용도
    createProgressBar();

    //종류 가져오기
    chooseProcessAlgorithm();

    //실행 progress 보여주기
    showProgressBar();
}

