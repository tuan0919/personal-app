import { Customer } from "@/types/api";

const CustomerMock : Customer[] = [
    {
        customerId: 1,
        customerName: "Nguyễn Văn A",
        address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
        phoneNumber: "0901234567",
        price1: 12000,
        price2: 25000,
        avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
        customerId: 2,
        customerName: "Trần Thị B",
        address: "45 Trần Phú, Quận 5, TP.HCM",
        phoneNumber: "0912345678",
        price1: 10000,
        price2: 20000,
        avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
        customerId: 3,
        customerName: "Lê Văn C",
        address: "78 Lê Lợi, Quận 1, TP.HCM",
        phoneNumber: "0987654321",
        price1: 15000,
        price2: 30000,
        avatar: "https://i.pravatar.cc/150?u=3",
    },
]

export {
    CustomerMock,
}