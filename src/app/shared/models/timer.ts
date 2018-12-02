export class Timer {
        public foiAlteradoHorasInicioFim: boolean;
        id: string;

        constructor(
              public descricao: string = null
            , public nota: string = ""
            , public contador: string = "0s"
            , public dataLancamento: string = null
            , public inicio: Date = null
            , public fim: Date = null
            , public tempoCorrendo: boolean = false
            ){  }

 
}