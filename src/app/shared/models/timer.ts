export class Timer {
        public tempoCorrendo: boolean
        public foiAlteradoHorasInicioFim: boolean;

        constructor(
              public descricao: string = null
            , public nota: string = ""
            , public contador: string = "0s"
            , public dataLancamentto: Date = null
            , public inicio: Date = new Date()
            , public fim: Date = new Date()
            ){  }

 
}