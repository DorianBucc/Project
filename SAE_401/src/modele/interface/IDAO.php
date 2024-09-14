<?php
    interface IDAO {
        function loadObject($result);
        function update($object);
        function delete($id);
    }