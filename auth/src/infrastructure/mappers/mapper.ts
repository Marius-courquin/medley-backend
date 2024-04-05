export abstract class Mapper<I, O> {
    abstract fromModel(param: I): O;
    abstract toModel(param: O): I;
}