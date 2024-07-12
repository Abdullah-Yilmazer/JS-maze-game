body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 70px;
  background-color: #d8f3dc;
  overflow: hidden;
}
:root {
  --border-color: #38a3a5;
  --border-size: 1px;
  --border-wh: 100%;
  /* --border-wh: calc(100% + 20px); */
  --cell-size: 20px;
}
button {
  background: #38a3a5;
  border: 2px solid #57cc99;
  color: #d8f3dc;
  padding: 5px;
  font-size: large;
}
input#size {
  border: 1px solid #57cc99;
  padding: 5px;
  background: #ffffff;
  color: #38a3a5;
}
label {
  color: #38a3a5;
}
.cell.start {
  background-color: green;
}

.cell.end {
  background-color: red;
}

.cell.player {
  background-color: blue;
}

.cell.solution {
  background-color: #57cc99;
}

#controls {
  margin: 20px;
}

#maze-container {
  display: grid;
  /* gap: var(--border-size); */
  gap: 0;
  border: var(--border-color) 11px solid;
}

.cell {
  position: relative;
  width: var(--cell-size);
  height: var(--cell-size);
  background-color: white;
}

.cell::before,
.cell::after {
  content: "";
  position: absolute;
  background-color: var(--border-color);
  z-index: 1;
}

.cell.top::before {
  width: var(--border-wh);
  height: var(--border-size);
  /* top: -10px;
  left: -10px; */
  top: 0;
  left: 0;
}

.cell.right::after {
  width: var(--border-size);
  height: var(--border-wh);
  /* top: -10px;
  right: -10px; */
  top: 0px;
  right: 0px;
}

span{
  font-size: xx-small;
}
span.left-hand::before {
  content: "";
  display: block;
  background: black;
  width: 50%;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
}
span.right-hand::before {
  content: "";
  display: block;
  background: black;
  width: 50%;
  height: 2px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
}
span.top-hand::before {
  content: "";
  display: block;
  background: black;
  width: 2px;
  height: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}
span.bottom-hand::before {
  content: "";
  display: block;
  background: black;
  width: 2px;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}

span.to-right::after {
  content: "";
  display: block;
  background: black;
  width: 50%;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
}
span.to-left::after {
  content: "";
  display: block;
  background: black;
  width: 50%;
  height: 2px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
}
span.to-top::after {
  content: "";
  display: block;
  background: black;
  width: 2px;
  height: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}
span.to-bottom::after {
  content: "";
  display: block;
  background: black;
  width: 2px;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}


#controls2{
  position: absolute;
  top: 50%;
  left: 100px;
  transform: translate(-50%, -50%);
}