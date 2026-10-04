const PRICE_TABLE = {
  SHAKER: 120000,
  GLOVES: 180000,
  STRAP: 150000,
};

let currentOrderCode = "";
let isValidOrder = false;

const testInputQueue = [
  { choice: 1, rawCode: "  gym-shaker-vip  " },
  { choice: 2 },
  { choice: 1, rawCode: "shaker" },
  { choice: 2 },
  { choice: 9 },
  { choice: 3 },
];

let inputIndex = 0;

function getNextUserAction() {
  if (inputIndex < testInputQueue.length) {
    return testInputQueue[inputIndex++];
  }
  return { choice: 3 };
}

let isRunning = true;

do {
  const action = getNextUserAction();
  const choice = action.choice;

  switch (choice) {
    case 1: {
      console.log("\n================================================");
      console.log("[CHUC NANG 1] NHAP VA CHUAN HOA MA DON HANG");
      console.log("================================================");

      const rawInput = action.rawCode || "";
      const cleanedCode = rawInput.trim().toUpperCase();

      console.log(`Ma dau vao tho: "${rawInput}"`);
      console.log(`Ma sau chuan hoa: "${cleanedCode}"`);

      if (cleanedCode.length < 8) {
        console.log(`LOI: Do dai ma (${cleanedCode.length} ky tu) ngan hon quy dinh toi thieu (8 ky tu).`);
        isValidOrder = false;
        currentOrderCode = "";
      } else if (!cleanedCode.startsWith("GYM")) {
        console.log(`LOI: Ma don hang phai bat dau bang tien to "GYM".`);
        isValidOrder = false;
        currentOrderCode = "";
      } else {
        isValidOrder = true;
        currentOrderCode = cleanedCode;
        console.log(`XAC NHAN: Ma don hang hop le!`);
      }
      break;
    }

    case 2: {
      console.log("\n================================================");
      console.log("[CHUC NANG 2] TINH TIEN VA IN HOA DON PHU KIEN");
      console.log("================================================");

      if (!isValidOrder || !currentOrderCode) {
        console.log("LOI: Ma don hang hien tai khong hop le hoac chua duoc nhap.");
        console.log("Vui long chon Chuc nang 1 de nhap ma hop le truoc khi in hoa don.");
        break;
      }

      let payload = "";
      if (currentOrderCode.startsWith("GYM-")) {
        payload = currentOrderCode.slice(4);
      } else if (currentOrderCode.startsWith("GYM")) {
        payload = currentOrderCode.slice(3);
      } else {
        payload = currentOrderCode;
      }

      const availableItems = ["SHAKER", "GLOVES", "STRAP"];
      let detectedItem = "";
      let isVip = payload.includes("VIP");

      for (let i = 0; i < availableItems.length; i++) {
        if (payload.includes(availableItems[i])) {
          detectedItem = availableItems[i];
          break;
        }
      }

      if (!detectedItem) {
        console.log(`LOI: Khong nhan dien duoc mat hang phu hop trong ma "${currentOrderCode}".`);
        console.log(`Cac ma san pham hop le: ${availableItems.join(", ")}`);
        break;
      }

      const unitPrice = PRICE_TABLE[detectedItem];
      const discountRate = isVip ? 0.1 : 0.0;
      const discountAmount = unitPrice * discountRate;
      const finalAmount = unitPrice - discountAmount;

      const borderLine = "-".repeat(40);

      console.log(borderLine);
      console.log("        HOA DON BAN LE PHU KIEN GYM       ");
      console.log(borderLine);
      console.log(` Ma don hang : ${currentOrderCode}`);
      console.log(` San pham    : ${detectedItem}`);
      console.log(` Hang the    : ${isVip ? "HOI VIEN VIP (-10%)" : "THUONG"}`);
      console.log(borderLine);
      console.log(` Don gia     :${unitPrice.toLocaleString("en-US").padStart(18)} VND`);
      console.log(` Giam gia    :-${discountAmount.toLocaleString("en-US").padStart(18)} VND`);
      console.log(borderLine);
      console.log(` THANH TIEN  :${finalAmount.toLocaleString("en-US").padStart(18)} VND`);
      console.log(borderLine);
      break;
    }

    case 3: {
      console.log("\n================================================");
      console.log("[CHUC NANG 3] THOAT CHUONG TRINH");
      console.log("Cam on ban da su dung he thong Gym Fitness!");
      console.log("================================================");
      isRunning = false;
      break;
    }

    default: {
      console.log("\nLUA CHON KHONG HOP LE!");
      console.log("Vui long chon mot trong cac chuc nang: 1, 2 hoac 3.");
      break;
    }
  }
} while (isRunning);