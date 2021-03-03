const stepObj = {
  talk: async function ({ str }) {
    console.log(str);
  },
  sleep: async function ({ delay }) {
    return sleep(delay);
  },
  sleepFirst: async function ({ delay }) {
    return sleep(delay);
  },
};

async function sleep(delay) {
  return new Promise((r, j) => setTimeout(r, delay));
}

function CC(name) {
  this.step = [];
  this.name = name;
  async function fn() {
    while (this.step.length) {
      const { name, params } = this.step.shift();
      if (this.step.length) {
        if (this.step[0].name === "sleepFirst") {
          const { name: lateName, params: lateParams } = this.step.shift();
          await stepObj[lateName](lateParams);
        }
      }
      if (!this.isTalkName) {
        console.log(this.name);
        this.isTalkName = true;
      }

      await stepObj[name](params);
    }
  }
  setTimeout(fn.bind(this), 0);
  return this;
}

const c = new CC("xjq");

CC.prototype.talk = function (str) {
  this.step.push({ name: "talk", params: { str } });
  return this;
};

CC.prototype.sleep = function (delay) {
  this.step.push({ name: "sleep", params: { delay } });
  return this;
};

CC.prototype.sleepFirst = function (delay) {
  this.step.push({ name: "sleepFirst", params: { delay } });
  return this;
};

c.talk("1").sleepFirst(1000).talk("2").sleep(3000).talk("3");
