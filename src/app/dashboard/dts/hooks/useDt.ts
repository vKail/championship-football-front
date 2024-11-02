import { useDtStore } from "@/stores/dt-store"
import { Id } from "react-toastify"
import Swal from "sweetalert2"
import { IDt } from "../interfaces/dts.interface"


const useDt = () => {
    const {
        dts,
        dt,
        isLoading,
        error,
        fetchAllDts,
        fetchDtById,
        addDt,
        modifyDt,
        removeDt,
        clearError,
        clearDt
    } = useDtStore()

    const handleGetAllDts = async () => {
        const success = await fetchAllDts()
        if (!success && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            })
        }
    }

    const handleCreateDt = async (dt : IDt) => {
        const success = await addDt(dt)
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'DT creado',
                text: 'El DT se ha creado correctamente',
            })
            return true
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo crear el DT'
        })
        return false
    }

    const handleUpdateDt = async (dt : IDt) => {
        const success = await modifyDt(dt)
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'DT actualizado',
                text: 'El DT se ha actualizado correctamente',
            })
            return true
        }
    }

    const handleRemoveDt = async (id : number) => {
        const success = await removeDt(id)
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'DT eliminado',
                text: 'El DT se ha eliminado correctamente',
            })
            return true
        }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error || 'No se pudo eliminar el DT'
        })
        return false
    }

    return {
        dts,
        dt,
        isLoading,
        error,
        handleGetAllDts,
        handleCreateDt,
        handleUpdateDt,
        handleRemoveDt,
        fetchDtById,
        clearError,
        clearDt
    }
}

export default useDt