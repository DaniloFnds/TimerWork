export class Timer {

        constructor(
              public descricao: string = ""
            , public nota: string = ""
            , public contador: string = "0s"
            , public dataLancamentto: string = ""
            , public inicio: Date = null
            , public fim: Date = null
            ){
    }
}