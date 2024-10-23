import LoginGuestForm from "@/features/auth/LoginGuestForm";
import { Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { RiGoogleLine } from "react-icons/ri";

export default function Login() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex justify-center px-5 pt-20">
        <Card className="max-w-[450px]">
          <div className="mb-3">
            <h5 className="text-2xl font-bold mb-2">Login</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, reprehenderit.</p>
          </div>
          <Button onClick={() => setOpenModal(true)} color="dark" className="w-full font-medium items-center">
            <HiOutlineUser size={21} />
            <span className="ms-2">Login Sebagai Tamu</span>
          </Button>
          <Button color="dark" outline className="w-full font-medium items-center" disabled>
            <RiGoogleLine size={21} />
            <span className="ms-2">Login Dengan Google</span>
          </Button>
          <p className="text-xs text-gray-500 mt-2">*Dengan login sebagai tamu, seluruh data akan disimpan pada penyimpanan browser.</p>
        </Card>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="lg" position="center">
        <Modal.Header>Masuk Sebagai Tamu</Modal.Header>
        <Modal.Body className="space-y-3">
          <LoginGuestForm />
        </Modal.Body>
      </Modal>
    </>
  )
};
