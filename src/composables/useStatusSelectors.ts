import useDictionary, {DictionaryModel} from 'src/composables/useDictionary';


export default function useStatusSelectors() {
    const {getConditionStatus, getInspectionStatus} = useDictionary()

    const getEnabledConditionStatus = (status: boolean): DictionaryModel[] => {
        const options = getConditionStatus(!status)
        return [options]
    }

    const getEnabledInspectionStatus = (status: string): DictionaryModel[] => {
        let options: DictionaryModel[] = []
        switch (status) {
            case 'VERIFICATION':
                options = [
                    getInspectionStatus('COMPLETE'),
                ]
                return options
            case 'COMPLETE':
                options = [
                    getInspectionStatus('LIQUIDATION'),
                    getInspectionStatus('COLLECTION'),
                    getInspectionStatus('FINISHED'),
                ]
                return options
            case 'LIQUIDATION':
                options = [
                    getInspectionStatus('COLLECTION'),
                    getInspectionStatus('FINISHED'),
                ]
                return options
            case 'COLLECTION':
                options = [
                    getInspectionStatus('FINISHED'),
                ]
                return options
            case 'COLLECTION_ROW':
                options = [
                    getInspectionStatus('PAID'),
                ]
                return options
            default:
                return options
        }
    }

    return {
        getEnabledConditionStatus,
        getEnabledInspectionStatus,
    }

}
